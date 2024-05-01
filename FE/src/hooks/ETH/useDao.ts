import { DAOContract } from "../../utils/ETH";
import { getProvier } from "../../utils/ETH/getProvider";

export default function useDao() {
  const initInstance = async () => {
    const { signer } = await getProvier();
    if (!signer) {
      throw new Error("Provider");
    }
    return new DAOContract(signer);
  };
  const getDao = async (id: string) => {
    const dao = await initInstance();
    return dao.getDao(id);
  };
  const joinDao = async (id: string) => {
    const dao = await initInstance();
    const user = await dao.getUser();
    if (user.userName === "") {
      alert("Please regiter your wallet");
      return;
    }
    return dao.joinDao(id);
  };
  const getDaos = async () => {
    const dao = await initInstance();
    return dao.getYourDao();
  };
  const createDAO = async () => {
    const dao = await initInstance();
    return dao.createDao({
      _treasury: 0,
      _domain: "Blockchain",
      _name: "",
      _limitCreate: "",
      _limitConfirm: "",
    });
  };
  const createUser = async (
    _userName: string,
    _bio: string,
    _userProfileImageUrl: string
  ) => {
    const dao = await initInstance();
    return dao.createUser(_userName, _bio, _userProfileImageUrl);
  };
  const getUser = async () => {
    const { signer } = await getProvier();

    if (!signer) {
      throw new Error("Provider");
    }
    return new DAOContract(signer).getUser();
  };

  const getPopularDao = async () => {
    const { signer } = await getProvier();

    if (!signer) {
      throw new Error("Provider");
    }
    return new DAOContract(signer).getPopularDao();
  };
  return {
    getDao,
    getUser,
    createDAO,
    createUser,
    getDaos,
    getPopularDao,
    joinDao,
  };
}
