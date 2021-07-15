import Header from '../Header/Header';
import PanelLeft from '../Panel/PanelLeft';
import PanelRight from '../Panel/PanelRight';

const MailLayout = ({ children, category })  =>{
  return (
    <div className="relative flex flex-col w-screen min-h-screen bg-cover bg-background">
      <Header />
      <div className="flex flex-1">
        <PanelLeft category={category} />
        <div className="flex-auto">
          {children}
        </div>
        <PanelRight />
      </div>
    </div>
  )
}

export default MailLayout;