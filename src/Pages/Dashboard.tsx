import React from "react";
import TopBar from "../Components/TopBar";
import NavigationMenu from "../Components/NavigationMenu";
import HeroSection from "../Components/HeroSection";
import FeaturedCollection from "../Components/FeaturedCollection";
import CollectionsSection from "../Components/CollectionCard";
import Toppicks from "../Components/Toppicks";
import Discover from "../Components/Discover";
import Navbar from "../Components/Navbar";
import Layout from "../Layout/Layout";

const Dashboard = () => {
  return (
    <div>
      <Layout>
        <HeroSection />
        <FeaturedCollection />
        <CollectionsSection />
        <Toppicks />
        <Discover />
      </Layout>
    </div>
  );
};

export default Dashboard;
