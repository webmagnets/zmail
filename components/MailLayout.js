import Header from '../components/Header/Header';
import PanelList from '../components/Panel/PanelList';

export default function MailLayout({ children }) {
  return (
    <div>
      <Header />
      <div>
        <PanelList />
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}