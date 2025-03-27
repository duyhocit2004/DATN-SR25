import { useEffect } from "react";
import ReviewFilter from "./ReviewFilter";
import ReviewTable from "./ReviewTable";
import { useAppDispatch } from "@/store/hooks";
import { fetchReviews } from "@/store/reducers/adminReviewSlice";

const ReviewsPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  return (
    <div className="list-product-container">
      <div className="header-top w-full flex items-center justify-between gap-2 mb-4">
        <ReviewFilter />
      </div>

      <ReviewTable />
    </div>
  );
};

export default ReviewsPage;
