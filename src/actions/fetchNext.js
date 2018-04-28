export function fetchNext({ tag }) {
  return async function(dispatch, getState) {
    dispatch({
      type: "FETCH_LOADING",
      loading: true
    });
    try {
      let num = getState().feed.step;
      let param = "https://cors-anywhere.herokuapp.com/https://api.qwant.com/api/search/images?count=25&offset=" + num*25 + "&q=" + tag;
      let response = await fetch(param);
      let json = await response.json();
      let jsonClean =
        json && json.data && json.data.result && json.data.result.items;
      num++;
      dispatch({
        type: "FETCH_APPEND_CARDS",
        cards: jsonClean,
        step: num
      });
    } catch (error) {
      dispatch({
        type: "FETCH_ERROR",
        error
      });
    } finally {
      dispatch({
        type: "FETCH_LOADING",
        loading: false
      });
    }
  };
}
