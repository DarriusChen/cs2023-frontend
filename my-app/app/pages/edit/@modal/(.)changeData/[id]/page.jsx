import Modal from '@/app/components/modal/Modal';
import UpdateInfo from '../../../changeData/[id]/page';

export default function UpdataModal({ params: { id } }) {
  return (
    <><Modal>
      <UpdateInfo></UpdateInfo>
      {/* <div>haha</div> */}
    </Modal></>
    
  );
}
