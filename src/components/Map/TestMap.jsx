// import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
// import React, { Component } from "react";

// class TestMap extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       updated: false,
//       user: null,
//       stores: [
//         { lat: 47.49855629475769, lng: -122.14184416996333 },
//         { latitude: 47.359423, longitude: -122.021071 },
//         { latitude: 47.2052192687988, longitude: -121.988426208496 },
//         { latitude: 47.6307081, longitude: -122.1434325 },
//         { latitude: 47.3084488, longitude: -122.2140121 },
//         { latitude: 47.5524695, longitude: -122.0425407 }
//       ]
//     };
//   }

//   displayMarkers = () => {
//     return this.state.stores.map((store, index) => {
//       return (
//         <Marker
//           key={index}
//           id={index}
//           position={{
//             lat: store.latitude,
//             lng: store.longitude
//           }}
//           onClick={() => console.log("You clicked me!")}
//         />
//       );
//     });
//   };

//   componentDidMount() {
//     this.setUserLocation();
//     console.log("component did mount");
//   }

//   componentDidUpdate() {
//     this.setUserLocation();
//     console.log("component did update");
//   }

//   setUserLocation = () => {
//     navigator.geolocation.getCurrentPosition(position => {
//       const currentUser = { lat: -8.0, lng: -190.0 };
//       currentUser.lat = position.coords.latitude;
//       currentUser.lng = position.coords.longitude;
//       this.setState({ user: currentUser });
//       this.setState({ updated: true });
//     });
//   };

//   render() {
//     console.log("this.state.user:", this.state.user);
//     if (this.state.user) {
//       return (
//         <Map
//           google={this.props.google}
//           zoom={8}
//           style={mapStyles}
//           center={this.state.user}
//         >
//           {this.displayMarkers()}
//           {this.setUserLocation()}
//         </Map>
//       );
//     } else {
//       return <h3>Loading...</h3>;
//     }
//   }
// }

// const mapStyles = {
//   width: "100%",
//   height: "100%"
// };

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyCrDVpHzeaPLfTOvbfNw2_0GRlce2YD2RI"
// })(TestMap);
