import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";

function ProfileModal({ modalOpened, setModalOpened }) {
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
        <form className="infoForm">
          <h3>Your info</h3>

          <div>
            <input
              type="text"
              className="infoInput"
              name="FirstName"
              placeholder="First Name"
            />
            <input
              type="text"
              className="infoInput"
              name="LastName"
              placeholder="Last Name"
            />
          </div>

          <div>
            <input
              type="text"
              className="infoInput"
              name="worksAT"
              placeholder="Works at"
            />
          </div>

          <div>
            <input
              type="text"
              className="infoInput"
              name="LivesIN"
              placeholder="Lives in"
            />
            <input
              type="text"
              className="infoInput"
              name="Country"
              placeholder="Country"
            />
          </div>

          <div>
            <input
              type="text"
              className="infoInput"
              name="Relationship Status"
              placeholder="Relationship Status"
            />
          </div>

          <div>
            Profile Image
            <input type="file" name="profileImg" />
            Cover Image
            <input type="file" name="coverImg" />
          </div>

          <button className="button infoButton">Update</button>
        </form>
      </Modal>
    </>
  );
}

export default ProfileModal;
