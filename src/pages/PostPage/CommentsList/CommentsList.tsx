import { ICommentItem } from "../../../app/models/ICommentItem";
import Comment from "../../../components/Comment/Comment";

// Интерфейс для комментария
interface CommentType {
  commentId: string; // Уникальный идентификатор комментария
  text: string;      // Текст комментария
  comments: ICommentItem[]; // Вложенные комментарии
}



// Пропсы для компонента CommentWithReplies
interface CommentWithRepliesProps {
  comment: ICommentItem;
  onAddReply: (commentId: string, text: string) => void
  onUserClick?: (userId: string) => void;
}

// Компонент для рендера комментария с вложениями
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

// Пропсы для компонента CommentsList
interface CommentsListProps {
  comments: ICommentItem[];
  onAddReply: (commentId: string, text: string) => void
}

// Компонент списка комментариев
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