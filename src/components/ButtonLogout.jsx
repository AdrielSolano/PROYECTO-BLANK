import { useContext } from "react";
import { estadoLoginGlobal } from "../context/contextdata";
import { Button } from "react-native-paper";

export default function BotonLogout() {
  const { logout } = useContext(estadoLoginGlobal);

  return <Button style={{
    padding: 10,
    marginTop: 22,
    backgroundColor: "#0984e3"

  }}
    labelStyle={{ color: "#fff", fontWeight: "bold" }}
    onPress={logout}
    mode="contained">
    Cerrar sesión
  </Button>;
}