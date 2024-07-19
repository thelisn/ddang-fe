import router from "@/router";

export const getClass = (data) => {
  // 파라미터로 team 이름 넘기거나 null
  let teamKey = null;

  if (!data) teamKey = JSON.parse(localStorage.getItem("userInfo")).teamName;
  else teamKey = data;

  const team = {
    양재: "yangae",
    디채: "dichae",
    모니모: "monimo",
    스포크: "spoke",
    어드민: "admin",
  }[teamKey];

  return team;
};

export const getUserInfo = () => {
  let result = JSON.parse(localStorage.getItem("userInfo"));

  return result;
};

export const sortTeamMember = (data) => {
  let teams = {};

  data.forEach((person) => {
    const { teamName } = person;
    if (!teams[teamName]) {
      teams[teamName] = [];
    }
    teams[teamName].push(person);
  });

  return teams;
};

export const clearLocalStorage = () => {
  if (confirm("localstorage 삭제!!")) {
    localStorage.clear();
    router.push("/");
  }
};
