import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import PostShare from "../PostShare/PostShare";

function ShareModal({ modalOpened, setModalOpened }) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        size="55%"
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
      >
        <PostShare />
      </Modal>
    </>
  );
}

export default ShareModal;
