import { ICommentItem } from "../../../app/models/ICommentItem";
import Comment from "../../../components/Comment/Comment";

interface CommentType {
  commentId: string; 
  text: string;      
  comments: ICommentItem[]; 
}



interface CommentWithRepliesProps {
  comment: ICommentItem;
  onAddReply: (commentId: string, text: string) => void
}

const CommentWithReplies: React.FC<CommentWithRepliesProps> = ({ comment, onAddReply }) => {
  return (
    <div>
      {/* Рендер текущего комментария */}
      <Comment comment={comment} onAddReply={onAddReply} />
      
      {/* Если есть вложенные комментарии, рендерим их */}
      {comment.comments && comment.comments.length > 0 && (
        <div style={{ marginLeft: 30 }}>
          {comment.comments.map((replyComment) => (
            <CommentWithReplies
              key={replyComment.commentId}
              comment={replyComment}
              onAddReply={onAddReply}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface CommentsListProps {
  comments: ICommentItem[];
  onAddReply: (commentId: string, text: string) => void
}

const CommentsList: React.FC<CommentsListProps> = ({ comments, onAddReply }) => {
  return (
    <div>
      {comments.map((comment) => (
        <CommentWithReplies key={comment.commentId} comment={comment} onAddReply={onAddReply} />
      ))}
    </div>
  );
};

export default CommentsList;