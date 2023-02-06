import EmpleadoService from "./empleados/empleados.service";
import CiudadesService from "./ciudades/ciudades.service";
import DireccionesService from "./direcciones/direcciones.service";
import RolesService from "./roles/roles.service";
import SectoresService from "./sectores/sectores.service";

const initAll = async () => {
  const empleado = new EmpleadoService();
  const ciudades = new CiudadesService();
  const direcciones = new DireccionesService();
  const roles = new RolesService();
  const sectores = new SectoresService();

  await ciudades.init();
  await direcciones.init();
  await roles.init();
  await sectores.init();
  await empleado.init();
};

export {
  initAll,
  EmpleadoService,
  CiudadesService,
  DireccionesService,
  RolesService,
  SectoresService,
};
