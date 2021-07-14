import Header from '../Header/Header';
import PanelLeft from '../Panel/PanelLeft';
import PanelRight from '../Panel/PanelRight';

export default function MailLayout({ children }) {
  return (
    <div className="bg-background bg-cover w-screen min-h-screen">
      <Header />
      <div className="flex">
        <PanelLeft />
        <div>
          {children}
        </div>
        <PanelRight />
      </div>
    </div>
  )
}