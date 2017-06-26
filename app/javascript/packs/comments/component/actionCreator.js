import axios from 'axios';

export default class ActionCreator {
    constructor(dispatcher) {
        this.dispatcher = dispatcher;
    }
    // "Emit" event ----> Store
    commentPost(comment) {
        comment.id = Date.now();
        axios.post('/api/comments', comment).then(res => {
          this.dispatcher.emit("commentPost", comment);
        }).catch(err => {
          // this.setState({ data: comments, count: 0 });
          // console.error(this.props.url, err.toString());
        })
    }
    loadComments() {
      axios.get('/api/comments').then(res => {
        this.dispatcher.emit("loadComments", res.data);
      }).catch(err => {
//        console.error(this.props.url, err.toString());
      });
    }
    commentDelete(id) {
      axios.delete('/api/comments/' + id).then(res => {
        this.dispatcher.emit("commentDelete", id)
      }).catch(err => {
//        console.error(this.props.url, err.toString());
      })
    }
}
