import React from 'react'
import { CommentGet } from '../../Models/Comment';
import StockCommentListItem from './StockCommentListItem';

type Props = {
    comments: CommentGet[];
};

const StockCommentList = ({ comments }: Props) => {
  return (
    <div>
        {comments ? comments.map((comment) => {
            return <StockCommentListItem comment={comment} />;
        }) : ""}
    </div>
  )
}

export default StockCommentList