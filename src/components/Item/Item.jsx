import "./Item.css";

const Item = ({ usuario, enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre, acumulado, email}) => {
  return (
    <>
      {
      usuario
              ?     <div className="cardProducto">
                    <h2>{usuario}</h2>
                    <p>Enero: {enero}% </p>
                    <p>Febrero: {febrero}% </p>
                    <p>Marzo: {marzo}% </p>
                    <p>Abril: {abril}% </p>
                    <p>Mayo: {mayo}% </p>
                    <p>Junio: {junio}% </p>
                    <p>Julio: {julio}% </p>
                    <p>Agosto: {agosto}% </p>
                    <p>Septiembre: {septiembre}% </p>
                    <p>Octubre: {octubre}% </p>
                    <p>Noviembre: {noviembre}% </p>
                    <p>Diciembre: {diciembre}% </p>
                    <h3>Acumulado: {(acumulado.toFixed(4)-1)*100}%</h3>
                    <p>email: {email}</p>
                  </div>
              :   <></>
      }
    </>

  );
};

export default Item;
