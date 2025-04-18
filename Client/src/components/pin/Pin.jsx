import "./pin.scss"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import { Link } from "react-router-dom"

function Pin({item}){
    return (
          <Marker position={[item.latitude,item.longitude]}>
                  <Popup>
                   <div className="popupContainer">
                    <img src={item.images} alt="" />
                   <div className="textContainer">
                    <Link to={`/${item.id}`}>{item.title}</Link>
                   <span>{item.bedroom} bedrooms</span>
                   <b>$ {item.price}</b>
                   </div>
                   </div>
                  </Popup>
                </Marker>
    )
}

export default Pin