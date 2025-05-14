'use client';

interface MessageProps {
  content: string;
  sender: 'You' | 'DeepSeek AI';
  time: string;
}

export default function Message({ content, sender, time }: MessageProps) {
  const formatMessageContent = (content: string) => {
    let formattedContent = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    formattedContent = formattedContent.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    formattedContent = formattedContent.replace(/### (.*?)(\n|$)/g, '<h3 class="text-lg font-bold mt-3 mb-2">$1</h3>');
    
    formattedContent = formattedContent.replace(/## (.*?)(\n|$)/g, '<h2 class="text-xl font-bold mt-4 mb-2">$1</h2>');
    
    formattedContent = formattedContent.replace(/# (.*?)(\n|$)/g, '<h1 class="text-2xl font-bold mt-4 mb-3">$1</h1>');
    
    formattedContent = formattedContent.replace(/- (.*?)(\n|$)/g, '<li>$1</li>');
    formattedContent = formattedContent.replace(/<li>.*?<\/li>/g, match => {
      return '<ul class="list-disc pl-5 my-2">' + match + '</ul>';
    });
    
    // Replace numbered lists
    formattedContent = formattedContent.replace(/\d+\. (.*?)(\n|$)/g, '<li>$1</li>');
    formattedContent = formattedContent.replace(/<li>.*?<\/li>/g, match => {
      return '<ol class="list-decimal pl-5 my-2">' + match + '</ol>';
    });
    
    formattedContent = formattedContent.replace(/\n/g, '<br>');
    
    formattedContent = formattedContent.replace(/<\/ul><ul>/g, '');
    formattedContent = formattedContent.replace(/<\/ol><ol>/g, '');
    
    return formattedContent;
  };

  return (
    <div 
      className={`message ${sender === 'You' ? 'user-message' : 'ai-message'}`}
    >
      <div className={`text-xs font-bold mb-1 ${
        sender === 'You' ? 'text-green-700 dark:text-green-400' : 'text-[var(--primary)]'
      }`}>
        {sender}
      </div>
      
      <div 
        className="whitespace-pre-wrap"
        dangerouslySetInnerHTML={
          sender === 'You' 
            ? { __html: content } 
            : { __html: formatMessageContent(content) }
        }
      />
      
      <div className="text-[11px] text-gray-500 text-right mt-1">
        {time}
      </div>
    </div>
  );
} 