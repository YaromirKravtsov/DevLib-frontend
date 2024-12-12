import React from "react";
import { ICommentItem } from "../../../app/models/ICommentItem";
import Comment from "../../../components/Comment/Comment";


// 🔹 Пропи для компонента CommentWithReplies
interface CommentWithRepliesProps {
  comment: ICommentItem;
  onAddReply: (commentId: string, text: string) => void;
  onUpdateComment: (commentId: string, text: string) => void;
  onDeleteComment: (commentId: string) => void;
}

// Компонент для рендерингу коментарів з відповідями
const CommentWithReplies: React.FC<CommentWithRepliesProps> = ({
  comment,
  onAddReply,
  onUpdateComment,
  onDeleteComment,
}) => {
  return (
    <div>
      <Comment
        comment={comment}
        onAddReply={onAddReply}
        onUpdateComment={onUpdateComment}
        onDeleteComment={onDeleteComment}
      />
      {comment.comments && comment.comments.length > 0 && (
        <div style={{ marginLeft: 30 }}>
          {comment.comments.map((replyComment) => (
            <CommentWithReplies
              key={replyComment.commentId}
              comment={replyComment}
              onAddReply={onAddReply}
              onUpdateComment={onUpdateComment}
              onDeleteComment={onDeleteComment}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// 🔹 Пропи для компонента CommentsList
interface CommentsListProps {
  comments: ICommentItem[];
  onAddReply: (commentId: string, text: string) => void;
  onUpdateComment: (commentId: string, text: string) => void;
  onDeleteComment: (commentId: string) => void;
}

// Основний список коментарів
const CommentsList: React.FC<CommentsListProps> = ({
  comments,
  onAddReply,
  onUpdateComment,
  onDeleteComment,
}) => {
  return (
    <div>
      {comments.map((comment) => (
        <CommentWithReplies
          key={comment.commentId}
          comment={comment}
          onAddReply={onAddReply}
          onUpdateComment={onUpdateComment}
          onDeleteComment={onDeleteComment}
        />
      ))}
    </div>
  );
};

export default CommentsList;
