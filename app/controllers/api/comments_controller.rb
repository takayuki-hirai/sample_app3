# app/controllers/api/comments_controller.rb
module Api
  class CommentsController < ActionController::Base
    def index
      @comments = Comment.all
      render json: @comments.to_json
    end

    def create
      @comment = Comment.new(comment_params)
      @comment.save!
      render json: @comment.to_json
    end

    private

    def comment_params
      params.permit(:author, :text)
    end    
  end
end
