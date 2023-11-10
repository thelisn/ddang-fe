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
