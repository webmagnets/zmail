import Header from '../Header/Header';
import PanelLeft from '../Panel/PanelLeft';
import PanelRight from '../Panel/PanelRight';

export default function MailLayout({ children, hash }) {
  return (
    <div className="flex flex-col w-screen min-h-screen bg-cover bg-background">
      <Header />
      <div className="flex flex-1">
        <PanelLeft hash={hash} />
        <div className="flex-auto">
          {children}
        </div>
        <PanelRight />
      </div>
    </div>
  )
}