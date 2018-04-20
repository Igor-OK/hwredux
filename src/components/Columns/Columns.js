import * as React from "react";

import { Grid } from "../Grid/Grid";
import { deepCopy } from "../../helpers/clone";
import { mobileLandscape, mobilePortrait } from "../../helpers/mobileDevice";

const scrollBarWidth = 16,
  middleWidth = 350,
  between = 35;

export class Columns extends React.Component {
  state = {
    newArray: [],
    columns: 0,
    columnWidth: 0,
    coordinate: 0
  };

  constructor(props) {
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.updateDimensionsListener = this.updateDimensionsListener.bind(this);
  }

  componentWillMount() {
    this.updateDimensions(this.props);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensionsListener);
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensionsListener);
  }

  componentWillReceiveProps(nextProps) {
    this.updateDimensions(nextProps);
  }

  updateDimensionsListener() {
    this.updateDimensions(this.props);
  }

  updateDimensions(props) {
    let win = window,
      documentElement = document.documentElement,
      body = document.getElementsByTagName("body")[0],
      width = win.innerWidth || documentElement.clientWidth || body.clientWidth,
      height =
        win.innerHeight || documentElement.clientHeight || body.clientHeight,
      cols,
      colWidth,
      verticalCoords,
      number,
      portraitMobileScroller = 1,
      horisontalCoords = 0;

    // Сейчас я вычислю размеры и координаты для всех элементов с картинками и передам их дальше
    // Дабы не изменять первоначальный массив данных добавлением в него новых полей, создадим клон и дальше будем работать с ним
    let array = deepCopy(props.Items);

    //Определяем количество колонок
    cols = Math.round(width / middleWidth);

    if (cols === 4) {
      verticalCoords = [0, 0, 0, 0];
    }
    if (cols === 3) {
      verticalCoords = [0, 0, 0];
    }
    if (cols === 2) {
      verticalCoords = [0, 0];
    }
    if (cols === 1) {
      verticalCoords = [0];
    }
    if (mobileLandscape(height)) {
      cols = -1;
      verticalCoords = [0];
    }
    if (mobilePortrait(height)) {
      portraitMobileScroller = 0; // делаю это, чтоб не учитывать ширину скрола на мобилке портретной
    }

    //ширина колонки если не landscape
    colWidth = Math.ceil(
      (width - scrollBarWidth * portraitMobileScroller - (cols + 1) * between) /
        cols
    );

    // считаем всю геометрию для всех сеток
    if (cols > 0) {
      for (let i = 0; i < array.length; i++) {
        //Вычисляем высоту и ширину компонента с картинкой при нашей ширине колонке
        let th = array[i].thumb_height;
        let tw = array[i].thumb_width;
        array[i].elem_height = Math.ceil(th * colWidth / tw);
        array[i].elem_width = colWidth;
        array[i].num = i;
        //Очень хочется, чтобы порядок расположения картинок соответствовал координатам top
        //(чем раньше картинка в массиве, тем выше она на странице, или левее)
        //посему определяем номер самой короткой колонки
        number = verticalCoords.indexOf(Math.min.apply(Math, verticalCoords));
        //получаем абсолютные координаты элемента
        array[i].elem_top = verticalCoords[number] + between; //задаем абсолютные координаты элемента
        array[i].elem_left = between + number * (colWidth + between);
        //добавляем высоту элемента к нашим высотам (обновляем меньшую длину сформированных колонок макета)
        verticalCoords[number] += array[i].elem_height + between;
      }
      this.setState({
        columns: cols,
        columnWidth: colWidth,
        newArray: array,
        coordinate: Math.min.apply(Math, verticalCoords)
      });
    }

    // считаем геометрию для landscape
    if (cols < 0) {
      for (let i = 0; i < array.length; i++) {
        // определяем размеры компонента-картинки
        let th = array[i].thumb_height;
        let tw = array[i].thumb_width;
        array[i].elem_width = Math.ceil(tw * (height - 2 * between) / th);
        array[i].elem_height = height - 2 * between;
        array[i].num = i;
        // абсолютные координаты элемента
        array[i].elem_top = between;
        array[i].elem_left = horisontalCoords + between;
        // обновляем горизонтальную координату для следующего элемента
        horisontalCoords += array[i].elem_width + between;
      }
      this.setState({
        columns: cols,
        newArray: array,
        coordinate: horisontalCoords
      });
    }
  }

  render() {
    return (
      <Grid
        Items={this.state.newArray}
        Cols={this.state.columns}
        Coordinate={this.state.coordinate}
        FetchMore={this.props.FetchMore}
      />
    );
  }
}
