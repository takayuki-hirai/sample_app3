import React, {Component} from 'react';
import CommentList from './commentList';
import CommentForm from './commentForm';
import axios from 'axios';
import _ from 'underscore';

import ActionCreator from "./ActionCreator"
import Store from "./Store"
import eventEmitter from "./EventEmitter"
// EventEmitterのインスタンスをそれぞれ渡す
// var dispatcher = new EventEmitter();
var action = new ActionCreator(eventEmitter);
var store = new Store(eventEmitter);

export default class CommentBox extends Component {
  constructor() {
    super();
    this.state = { data: [], count: 0 };
    // <---- Observe store's change
    store.on("CHANGE", () => {
        this._onChange();
    });

    store.on("COMMENT_POST_DONE", () => {
      console.log("COMMENT_POST_DONE")
        this._onPost();
    });

    store.on("COMMENTS_LOAD_DONE", () => {
      console.log("COMMENTS_LOAD_DONE")
        this._onLoad();
    });

    store.on("COMMENT_DELETE_DONE", () => {
      console.log("COMMENT_DELETE_DONE")
        this._onDelete();
    });
  }
  _onChange() {
    this.setState({data: this.state.data, count: store.getCount()});
  }
  _onPost() {
    this.setState({data: store.getComments(), count: store.getCount()});
  }
  _onLoad() {
    this.setState({data: store.getComments(), count: store.getCount()});
  }
  _onDelete() {
    this.setState({data: store.getComments(), count: store.getCount()});
  }
  loadCommentsFromServer() {
    action.loadComments();
  }

  componentDidMount() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer.bind(this), this.props.pollInterval);
  }

  render() {
    return (
      <div>
        <section className="section">
          <h1 className="title">Comments</h1>
          <CommentList data={this.state.data} />
        </section>
        <section className="section">
          <CommentForm />
          <p>
            count: {this.state.count}
          </p>
        </section>
      </div>
    );
  }
}
