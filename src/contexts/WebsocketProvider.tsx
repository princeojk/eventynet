import { socket, WebsocketContext } from "./WebsocketContext";

export const WebsocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <WebsocketContext.Provider value={socket}>
      {children}
    </WebsocketContext.Provider>
  );
};
