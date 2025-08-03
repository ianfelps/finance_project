import React, { useCallback, useEffect, useState } from 'react'
import StockCommentForm from './StockCommentForm/StockCommentForm';
import { commentGetAPI, commentPostAPI } from '../../Services/CommentService';
import { toast } from 'react-toastify';
import { CommentGet } from '../../Models/Comment';
import Spinner from '../Spinner/Spinner';
import StockCommentList from '../StockCommentList/StockCommentList';

type Props = {
    stockSymbol: string;
};

type CommentFormInputs = {
    title: string;
    content: string;
};

const StockComment = ({ stockSymbol }: Props) => {
    const [comments, setComment] = useState<CommentGet[] | null>(null);
    const [loading, setLoading] = useState<boolean>();

    const getComments = useCallback(() => {
        setLoading(true);
        commentGetAPI(stockSymbol).then((response) => {
            setLoading(false);
            setComment(response?.data!);
        });
    }, [stockSymbol]);

    useEffect(() => {
        getComments();
    }, [getComments]);

    const handleComment = (e: CommentFormInputs) => {
        commentPostAPI(e.title, e.content, stockSymbol)
            .then((response) => {
                if (response) {
                    toast.success("Comment posted successfully!");
                    getComments();
                }
            }).catch((error) => {
                toast.warning(error);
            });
    };

  return (
    <div className='flex flex-col'>
        {loading ? <Spinner /> : <StockCommentList comments={comments!} />}
        <StockCommentForm symbol={stockSymbol} handleComment={handleComment}/>
    </div>
  )
}

export default StockComment