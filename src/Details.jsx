import { Component, useContext } from "react";
import { useParams } from "react-router-dom";
import Carousel from "./Carousel.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";
import ThemeContext from "./ThemeContext.jsx";

// const Details = () => {
//   const { id } = useParams();
//   return <h2>fd fds fds</h2>;
// };
//
// export default Details;

class Details extends Component {
  state = { loading: true };

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`
    );
    const json = await res.json();

    this.setState(Object.assign({ loading: false }, json.pets[0]));
  }

  render() {
    if (this.state.loading) {
      return <h2>loading...</h2>;
    }

    // ErrorBoundary test
    // throw new Error("crashed x.x");

    const { animal, breed, city, state, description, name, images } = this.state;
    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>{animal} - {breed} - {city}, {state}</h2>
          <button style={{ backgroundColor: this.props.theme }}>Adopt {name}</button>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

const WrappedDetails = () => {
  const params = useParams();
  const [theme] = useContext(ThemeContext);
  return (
    <ErrorBoundary>
      <Details params={params} theme={theme} />
    </ErrorBoundary>
  );
};

export default WrappedDetails;
