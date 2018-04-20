import * as React from "react";
import { connect } from "react-redux";

import { Columns } from "../Columns/Columns";
import { Tags } from "../Tags/Tags";
import { fetchNext } from "../../actions/fetchNext";

const stateToProps = state => ({
  tag: state.tags.current,
  cards: state.feed.cards,
  error: state.feed.error
});

export const Fetch = connect(stateToProps)(
  class Fetch extends React.Component {
    state = {
      loading: true
    };

    constructor(props) {
      super(props);

      this.fetchMore = this.fetchMore.bind(this);
    }

    componentDidMount() {
      this.step = 1;

      this.fetchMore()
        .then(
          this.setState({
            loading: false
          })
        )
        .catch(error => {
          this.setState({
            loading: false,
            error
          });
        });
    }

    componentWillReceiveProps(props) {
      if (props.tag !== this.props.tag) {
        this.props.dispatch({
          type: "FETCH_RESET"
        });
      }
    }

    fetchMore() {
      return this.props.dispatch(
        fetchNext({
          tag: this.props.tag
        })
      );
    }

    render() {
      let { error, cards } = this.props,
        loading = this.state.loading;

      if (loading) {
        return <div className="spinner">загрузка...</div>;
      }

      if (error) {
        return (
          <div className="screen">
            <h1>ERROR: {error.message}</h1>
          </div>
        );
      }

      return (
        <React.Fragment>
          <Columns Items={cards} FetchMore={this.fetchMore} />
          <Tags />
        </React.Fragment>
      );
    }
  }
);
