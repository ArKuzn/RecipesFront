import React from 'react';
import Total from '../components/Header';
import ProfileCard from '../components/profileCard';
import config from '../config';

export default class OtherProfiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showProfile: false,
      profile: '',
      logout: false,
      error: false,
    };
  }

  componentDidMount() {
    let url;
    if (this.props.match.params.id) {
      url = new URL(`${config.apiUrl}/users/${this.props.match.params.id}`)
    }
    fetch(url, { method: 'GET' })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then((json) => {
        if (!json.error) {
          this.setState({ showProfile: true, profile: json });
        } else {
          this.setState({ error: json.msg });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  showError = () => {
    return this.state.error;
  }

  showProfile = () => {
    if (this.state.showProfile) {
      return (
        <div>
          <ProfileCard
            {...this.state.profile}
            logout={this.state.logout}
            deleteAccount={this.state.deleteAccount}
          />
        </div>
      );
    }
    return this.state;
  }

  render() {
    return (
      <div className="body">
        <Total />
        {this.showProfile()}
      </div>
    );
  }
}
