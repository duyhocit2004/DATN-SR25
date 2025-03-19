import { useEffect } from "react";
import BannerFilter from "./BannerFilter";
import BannerTable from "./BannerTable";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBanners } from "@/store/reducers/adminBannerSlice";
import { setShowAddModal } from "@/store/reducers/adminBannerSlice";
import AddBannerModal from "./create";
import UpdateBannerModal from "./update";

const BannersPage = () => {
  const { showAddModal, selectedBanner } = useAppSelector(
    (state) => state.adminBanner
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);

  const handleAdd = () => {
    dispatch(setShowAddModal(true));
  };

  const refreshData = () => {
    dispatch(fetchBanners());
  };

  return (
    <div className="list-banner-container">
      <div className="header-top w-full flex items-center justify-between gap-2 mb-4">
        <BannerFilter />
      </div>
      <div className="header-bottom mb-4">
        <div className="actions">
          <Button
            className="w-100px"
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            Thêm mới
          </Button>
        </div>
      </div>

      <BannerTable />
      {showAddModal && <AddBannerModal refreshData={refreshData} />}
      {selectedBanner && <UpdateBannerModal refreshData={refreshData} />}
    </div>
  );
};

export default BannersPage;
