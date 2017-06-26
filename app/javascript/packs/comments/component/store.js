import { EventEmitter } from "./EventEmitter"
import _ from 'underscore';

export default class Store extends EventEmitter {
    constructor(dispatcher) {
        super();
        this.count = 0;
        this.commets = []
        dispatcher.on("commentPost", this.onPostComment.bind(this));
        dispatcher.on("loadComments", this.onLoadComments.bind(this));
        dispatcher.on("commentDelete", this.onDeleteComment.bind(this));
    }
    getCount() {
        return this.comments.length;
    }
    onPostComment(comment) {
        this.comments.push(comment)
        this.emit("COMMENT_POST_DONE");
    }
    getComments() {
        return this.comments;
    }
    onLoadComments(comments) {
        this.comments = comments
        this.emit("COMMENTS_LOAD_DONE");
    }
    onDeleteComment(id) {
        this.comments =  _.filter(this.comments, function(comment){ return comment.id != id; });
        this.emit("COMMENT_DELETE_DONE");
    }
}
