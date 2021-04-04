import { GeoLocation } from 'react-redux-geolocation';
 
const App = props => {
  return (
    <div>
      <GeoLocation />
      {props.children}
    </div>
  );
};