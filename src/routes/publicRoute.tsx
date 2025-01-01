import React from "react";

interface IPublicRoute {
  component: React.ComponentType; // Accepts only React components
}

const PublicRoute = ({ component: Component }: IPublicRoute): JSX.Element => {
  return <Component />;
};

export default PublicRoute;
