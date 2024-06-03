
import { NextUIProvider } from "@nextui-org/system";
import Header from "./components/header";
import Footer from "./components/footer";
import CustomCard from "./components/customcard";
import PortalCard from "./components/portalCard";
import { FaUserLarge , FaChartColumn } from 'react-icons/fa6';

export default function Home() {
  return (
    <NextUIProvider className="h-screen bg-beige">
      <Header title="Restaurateur" showMyAccount={true} showStats={true} showSponsor={true}/>
      <div className="container mx-auto">
        <div className="flex flex-wrap place-content-center">
          <CustomCard title="Commandes" description="Suivre et valider des commandes" href="/commandes" btnText="Accéder" />
          <CustomCard title="Articles" description="Créer, modifier, supprimer et consulter un article" href="#" btnText="Accéder" />
          <CustomCard title="Menus" description="Créer, modifier, supprimer et consulter un menu" href="#" btnText="Accéder" />
          <CustomCard title="Livraisons" description="Suivre des livraisons" href="#" btnText="Accéder" />
        </div>
      </div>
      <Footer/>
    </NextUIProvider>
  );
}
