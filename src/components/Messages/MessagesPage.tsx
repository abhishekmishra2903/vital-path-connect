
import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, Search, User, Calendar, AlertTriangle, Plus } from 'lucide-react';
import NewMessageForm, { MessageFormValues } from './NewMessageForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const initialMessages = [
  {
    id: '1',
    senderName: 'Dr. Sarah Johnson',
    subject: 'Lab Results Available',
    content: 'Your recent blood work results are now available. Your cholesterol levels have improved since your last visit. Please schedule a follow-up appointment to discuss your treatment plan.',
    messageType: 'lab_results',
    isRead: false,
    createdAt: '2024-06-05T09:30:00',
    isFromProvider: true
  },
  {
    id: '2',
    senderName: 'Dr. Michael Chen',
    subject: 'Medication Adjustment',
    content: 'Based on your recent glucose readings, I recommend adjusting your Metformin dosage. Please increase to 750mg twice daily starting next week. Monitor your blood sugar closely.',
    messageType: 'prescription',
    isRead: true,
    createdAt: '2024-06-04T14:15:00',
    isFromProvider: true
  },
  {
    id: '3',
    senderName: 'Wellness Center',
    subject: 'Appointment Reminder',
    content: 'This is a reminder that you have an appointment scheduled with Dr. Emily Rodriguez on June 20th at 9:15 AM. Please arrive 15 minutes early for check-in.',
    messageType: 'appointment_related',
    isRead: true,
    createdAt: '2024-06-03T10:00:00',
    isFromProvider: true
  },
  {
    id: '4',
    senderName: 'You',
    subject: 'Question about side effects',
    content: 'Hi Dr. Johnson, I have been experiencing some dizziness since starting the new blood pressure medication. Is this normal? Should I be concerned?',
    messageType: 'general',
    isRead: true,
    createdAt: '2024-06-02T16:45:00',
    isFromProvider: false
  },
  {
    id: '5',
    senderName: 'Health Portal',
    subject: 'Annual Physical Due',
    content: 'Your annual physical examination is due. Please contact our office to schedule your appointment. Early detection is key to maintaining good health.',
    messageType: 'general',
    isRead: false,
    createdAt: '2024-06-01T08:00:00',
    isFromProvider: true
  }
];

const MessagesPage = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [showNewMessageDialog, setShowNewMessageDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleNewMessage = (data: MessageFormValues) => {
    const newMessage = {
      ...data,
      id: Date.now().toString(),
      senderName: 'You', // Assuming the user is sending the message
      createdAt: new Date().toISOString(),
      isRead: true, // Message sent by user is considered read by them
      isFromProvider: false, // Message is from the user, not a provider
      messageType: 'general',
    };
    setMessages(prevMessages => [newMessage, ...prevMessages]);
    setShowNewMessageDialog(false); // Close the dialog
  };
  const getMessageTypeColor = (type: string) => {
    switch (type) {
      case 'lab_results': return 'bg-green-100 text-green-800';
      case 'prescription': return 'bg-purple-100 text-purple-800';
      case 'appointment_related': return 'bg-blue-100 text-blue-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMessageTypeIcon = (type: string) => {
    switch (type) {
      case 'lab_results': return <AlertTriangle className="h-4 w-4" />;
      case 'prescription': return <MessageCircle className="h-4 w-4" />;
      case 'appointment_related': return <Calendar className="h-4 w-4" />;
      default: return <MessageCircle className="h-4 w-4" />;
    }
  };

  const formatMessageDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const filteredMessages = messages.filter(message => 
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unreadCount = messages.filter(msg => !msg.isRead).length;

  return (
    <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-green-900 flex items-center">
            <MessageCircle className="mr-3 h-8 w-8" />
            Messages
            {unreadCount > 0 && (
              <Badge className="ml-3 bg-red-500 text-white">
                {unreadCount} unread
              </Badge>
            )}
          </h1>
          <p className="text-green-600 mt-1">Communicate with your healthcare providers</p>
        </div>
        <Dialog open={showNewMessageDialog} onOpenChange={setShowNewMessageDialog}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
              <Plus className="mr-2 h-4 w-4" />
              New Message
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Compose New Message</DialogTitle>
            </DialogHeader>
            <NewMessageForm
              onSubmit={handleNewMessage}
              onCancel={() => setShowNewMessageDialog(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.map((message) => (
          <Card 
            key={message.id} 
            className={`shadow-lg hover:shadow-xl transition-shadow cursor-pointer ${
              !message.isRead ? 'ring-2 ring-green-300 bg-green-50' : ''
            } ${message.isFromProvider ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-blue-500'}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="font-semibold text-gray-900">{message.senderName}</span>
                    </div>
                    <Badge className={getMessageTypeColor(message.messageType)}>
                      <div className="flex items-center space-x-1">
                        {getMessageTypeIcon(message.messageType)}
                        <span>{message.messageType.replace('_', ' ')}</span>
                      </div>
                    </Badge>
                    {!message.isRead && (
                      <Badge className="bg-red-500 text-white">New</Badge>
                    )}
                  </div>
                  
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">
                    {message.subject}
                  </h3>
                  
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {message.content}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {formatMessageDate(message.createdAt)}
                    </span>
                    <Button size="sm" variant="outline" className="hover:bg-green-100">
                      <Send className="mr-2 h-4 w-4" />
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMessages.length === 0 && (
        <Card className="p-8 text-center">
          <CardContent>
            <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No messages found</h3>
            <p className="text-gray-500">Try adjusting your search terms or check back later for new messages.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MessagesPage;
