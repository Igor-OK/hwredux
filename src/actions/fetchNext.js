export function fetchNext({ tag }) {
  return async function(dispatch, getState) {
    dispatch({
      type: "FETCH_LOADING",
      loading: true
    });
    try {
      let num = getState().feed.step;
      // let param = 'https://api.qwant.com/api/search/images?count=25&offset=25&q=dogs';
      let param = "/data/data-" + tag + "-" + num + ".json";
      let response = await fetch(param);
      let json = await response.json();
      let jsonClean =
        json && json.data && json.data.result && json.data.result.items;
      num++;
      if (num === 5) num = 1; // пока зациклю на мои 4 json файлов

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
