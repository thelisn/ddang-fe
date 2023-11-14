exports.getClass = (data) => {  // 파라미터로 team 이름 넘기거나 null
  let teamName = null;

  if (!data) {
    teamName = JSON.parse(localStorage.getItem('userInfo')).teamName;
  } else {
    teamName = data;
  }

  if (teamName === '양재') {
    return 'yangjae'
  } else if (teamName === '디채') {
    return 'dichae'
  } else if (teamName === '모니모') {
    return 'monimo'
  } else if (teamName === '스포크') {
    return 'spoke'
  } else if (teamName === '어드민') {
    return 'admin'
  }
}

exports.getUserInfo = () => {
  let result = JSON.parse(localStorage.getItem('userInfo'));

  return result
}

exports.sortTeamMember = (data) => {
  let teams = {};

  data.forEach((person) => {
    const { teamName } = person;
    if (!teams[teamName]) {
      teams[teamName] = [];
    }
    teams[teamName].push(person);
  });

  return teams;
}