import Header from "../components/Header";
import EmailTable from "../components/EmailTable";
import ComposeModal from "../components/ComposeModal";

export default function Dashboard() {
  return (
    <div>
      <Header />
      <div className="p-4">
        <ComposeModal />
        <EmailTable type="scheduled" />
        <EmailTable type="sent" />
      </div>
    </div>
  );
}
