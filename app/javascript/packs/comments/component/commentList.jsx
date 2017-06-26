import React, {Component} from 'react';
import Remarkable from 'remarkable';

import ActionCreator from "./ActionCreator"
import eventEmitter from "./EventEmitter"
var action = new ActionCreator(eventEmitter);

export default class CommentList extends Component {
  render() {
    var commentNodes = this.props.data.map( comment =>
      <Comment author={comment.author} key={comment.id} id={comment.id}>
        {comment.text}
      </Comment>
    );
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
}

class Comment extends Component {
  handleDelete() {
    action.commentDelete(this.props.id);
  }

  rawMarkup() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  }

  render() {
    return (
      <article className="columns">
        <div className="column">
          <div className="comment card">
            <header className="card-header">
              <h2 className="commentAuthor card-header-title">{this.props.author}</h2>
              <button className="delete" onClick={ this.handleDelete.bind(this) }></button>
            </header>
            <div className="card-content">
              <span dangerouslySetInnerHTML={this.rawMarkup() } />
            </div>
          </div>
        </div>
      </article>
    );
  }
}
