import React, { Component } from 'react';
import { connect } from 'react-redux';
// Add script into specific component
// import Script from 'react-load-script';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from 'react-places-autocomplete';
import { Icon, Button } from 'semantic-ui-react';
import GoogleMapReact from 'google-map-react';
import { openModal } from '../modals/modalActions';
import {
    incrementAsync,
    decrementAsync,
    incrementCounter
} from './testActions';

const mapState = state => ({
    data: state.test.data,
    loading: state.test.loading
});

const actions = {
    openModal,
    incrementAsync,
    decrementAsync,
    incrementCounter
};
const Marker = () => <Icon name="marker" size="big" color="red" />;

class TestComponent extends Component {
    static defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 11
    };

    state = {
        address: '',
        scriptLoaded: false
    };

    handleScriptLoad = () => {
        this.setState({ scriptLoaded: true });
    };

    handleFormSubmit = event => {
        event.preventDefault();

        geocodeByAddress(this.state.address)
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error));
    };

    onChange = address => {
        this.setState({ address });
    };

    render() {
        const inputProps = {
            value: this.state.address,
            onChange: this.onChange
        };
        const { data } = this.props;
        return (
            <div>
                {/* <Script
                    url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBkb5eF3TFlOHwyKqEKcaRo_su5DSgFvP0&libraries=places"
                    onLoad={this.handleScriptLoad}
                /> */}
                <h1>Test Area</h1>
                <h3>The answer is: {data}</h3>
                <form onSubmit={this.handleFormSubmit}>
                    {/* Make sure the script is loaded before executing this component */}
                    {this.state.scriptLoaded && (
                        <PlacesAutocomplete inputProps={inputProps} />
                    )}
                    <button type="submit">Submit</button>
                    <Button
                        color="teal"
                        content="open"
                        onClick={() =>
                            this.props.openModal('TestModal', { data: 'haha' })
                        }
                    />
                    <Button
                        loading={this.props.loading}
                        color="green"
                        content="Inrement"
                        onClick={this.props.incrementAsync}
                    />
                    <Button
                        loading={this.props.loading}
                        color="red"
                        content="Derement"
                        onClick={this.props.decrementAsync}
                    />
                </form>
                <br />
                <br />
                <div style={{ height: '300px', width: '100%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{
                            key: 'AIzaSyBkb5eF3TFlOHwyKqEKcaRo_su5DSgFvP0'
                        }}
                        defaultCenter={this.props.center}
                        defaultZoom={this.props.zoom}
                    >
                        <Marker
                            lat={59.955413}
                            lng={30.337844}
                            text={'Kreyser Avrora'}
                        />
                    </GoogleMapReact>
                </div>
            </div>
        );
    }
}

export default connect(
    mapState,
    actions
)(TestComponent);
