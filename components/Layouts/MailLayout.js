import { useState } from 'react';
import Header from '../Header/Header';
import ComposeMailModal from '../Modal/ComposeMailModal';
import PanelLeft from '../Panel/PanelLeft';
import PanelRight from '../Panel/PanelRight';

const MailLayout = ({ children, category }) => {
  const [isComposeMailModalOpen, setIsComposeMailModalOpen] = useState(false);

  const handleComposeMailOpenStatus = (status) => {
    setIsComposeMailModalOpen(status);
  }

  return (
    <div className="relative flex flex-col w-screen max-h-screen min-h-screen bg-cover bg-background">
      <Header />
      <div className="flex flex-1">
        <PanelLeft
          category={category}
          handleComposeMailOpenStatus={handleComposeMailOpenStatus}
        />
        <div className="relative flex-auto">
          { 
            // Compose Mail Modal
            isComposeMailModalOpen &&
            <ComposeMailModal
              handleComposeMailOpenStatus={handleComposeMailOpenStatus}
            />  
          }
          {children}
        </div>
        <PanelRight />
      </div>
    </div>
  )
}

export default MailLayout;