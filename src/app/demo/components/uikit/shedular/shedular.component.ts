
import { Component, OnInit } from '@angular/core';
import { WorkerService } from 'src/app/_services/worker.service';
import { RootService } from '../../../../_services/_rootService';;
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import jsPDF from 'jspdf';
import "jspdf-autotable";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shedular',
  templateUrl: './shedular.component.html',
  styleUrls: ['./shedular.component.scss']
})

export class ShedularComponent implements OnInit {

  constructor(private readonly activatedRoute: ActivatedRoute, private workerService: WorkerService, private rootService: RootService) { }
  public element: any = ''
  public totalRec: any = [];
  public finalData: any = [];
  public data: any;
  public AllShiftsCurrent: any
  public dateList: any = [];
  public HFType: any[] = [];
  public designation: Array<{ Name: string }> = []
  public designationData = { Name: "" };
  public divisions: Array<{ Name: string, Code: string }> = []
  public divisionsData = { Name: "", Code: "" };
  public districts: Array<{ Name: string, Code: string }> = [];
  public districtsData = { Name: "", Code: "" };
  public tehsils: Array<{ Name: string, Code: string }> = [];
  public tehsilsData = { Name: "", Code: "" };
  public hfTypes: Array<{ Name: string, Code: string }> = [];
  public HfTypesData = { Name: "", Code: "" };
  public healthFacilities: Array<{ Name: string, Code: string, FullName: string }> = [];
  public healthFacilitiesData = { Name: "", Code: "" };
  public BasicHealthUnit: Array<{ Name: string, Code: string }> = [];
  public BasicHealthUnitType = { Name: "", Code: "" };
  public empRoaster = { hfmisCode: "", month: "", designation: "", hfTypeCode: "", ModeName: "", rosterDate: new Date() };
  public user: any = null;
  public month: string = "";
  public isLoading: boolean = false;
  value5: any;
  public isShow: boolean = false;
  public isToggle: boolean = true;
  public counter: number = 0;
  public isServerResponding: boolean = false;
  public placeHolderDivision = 'Select Division'
  public placeHolderDistrict = 'Select District'
  public placeHolderTehsil = 'Select Tehsil'
  public placeHolderHFType = 'Select Health Facility Type'
  public placeHolderBHU = 'Select Basic Health Unit Type'
  public placeHolderHf = 'Select Health Facility'
  public tempHF: string = ""
  public isDisable: boolean = false;
  public RosterDate: Date = new Date();

  public pdfData: any = [];
  public pdfObjectHeader: any = [];

  public exportColumns: any = [];
  public tempArray: any[] = [];

  public cols: any[] = [];
  public _data: any = [];
  public _dataPdf: any[][] = [];
  public found: boolean = false;
  public tempObj: object = {};
  public isTempObj: boolean = false;
  public tempShifts: any[] = []
  public IsShowPdf: boolean = false
  public clonedArray: any = [];
  public isShowHfType: boolean = false
  public isHfName: boolean = false;
  public matrix: any;
  public list = [

    '2023-02-01'
    , '2023-02-02'
    , '2023-02-03'
    , '2023-02-04'
    , '2023-02-05'
    , '2023-02-06'
    , '2023-02-07'
    , '2023-02-08'
    , '2023-02-09'
    , '2023-02-10'
    , '2023-02-11'
    , '2023-02-12'
    , '2023-02-13'
    , '2023-02-14'
    , '2023-02-15'
    , '2023-02-16'
    , '2023-02-17'
    , '2023-02-18'
    , '2023-02-19'
    , '2023-02-20'
    , '2023-02-21'
    , '2023-02-22'
    , '2023-02-23'
    , '2023-02-24'
    , '2023-02-25'
    , '2023-02-26'
    , '2023-02-27'
    , '2023-02-28'
  ]
  //=========================== Infinite Loop Logic Here ===========================//

  throttle = 300;
  scrollDistance = 0.2;
  limit = 20;
  page = 1;

  onScrollEnd() {
    this.page += 1;
    if (this.page <= 5) {
      this.AllEmpDutyRoasterList({ page: this.page, limit: this.limit });
    }
  }
  //========================== End Infinite Loop Logic =============================//
  ngOnInit() {

    var retrievedObject: any = localStorage.getItem('ussr');
    this.user = JSON.parse(retrievedObject);
    const date = new Date(Date.now())
    this.month = date.toLocaleString('default', { month: 'long' });
    if (this.user.hfname != null) {
      this.isHfName = true;
    }
    this.getHfTypes();
    this.getBhuList();
    this.getDivisions();
    this.IsShowPdf = true;
    if (localStorage.getItem('HF') == "" || localStorage.getItem('HF') == null) {

      this.empRoaster.hfmisCode = this.user.DistrictCode;
      this.empRoaster.month = this.month;
      this.empRoaster.rosterDate = this.RosterDate;
      // this.AllEmpDutyRoasterList(this.empRoaster);
      console.log(this.user);
    } else {
      this.getHealthFacilityForShift();
    }
    // Code added by Mahmood to Laod Roster coming from Bio-metric Registration Dashboard
    console.log("Activated Route :: ", this.activatedRoute.snapshot);
    if (Object.keys(this.activatedRoute.snapshot.queryParams).length > 0) {
      this.empRoaster.hfmisCode = this.activatedRoute.snapshot.queryParams["hfmisCode"];
      this.empRoaster.hfTypeCode = this.activatedRoute.snapshot.queryParams["hfTypeCode"];
      this.empRoaster.month = this.activatedRoute.snapshot.queryParams["month"];
      // this.empRoaster.rosterDate = this.activatedRoute.snapshot.queryParams["rosterDate"];
      console.log("Query Parameters :: ", this.empRoaster);
      //  

      this.AllEmpDutyRoasterList(this.empRoaster);
    }
  }

  public toggle() {
    this.isToggle = !this.isToggle;
  }

  public getHealthFacilityForShift() {

    let hf = localStorage.getItem('HF');
    if (hf !== "") {
      this.rootService.getHealthFacilityForShift(hf).subscribe((res: any) => {

        if (res.status) {
          this.isDisable = true;
          this.placeHolderDivision = ''
          this.placeHolderDistrict = ''
          this.placeHolderTehsil = ''
          this.placeHolderHFType = ' '
          this.placeHolderBHU = ''
          this.placeHolderHf = ''
          console.log('..................', res);
          this.tempHF = res.Data.FullName;
          this.divisions = this.divisions.filter(x => x.Code === res.Data.DivisionCode);
          this.loadDistrict(res.Data.DistrictCode)
          this.loadTehsils(res.Data.TehsilCode);
          this.hfTypes = this.hfTypes.filter(x => x.Code === res.Data.HftypeCode);
          this.BasicHealthUnit = this.BasicHealthUnit.filter(x => x.Name === res.Data.ModeName);
          if (res.Data.ModeName === 'BHU 24/7') {
            res.Data.ModeName = 'BHU 24'
            this.BasicHealthUnit[0].Name = 'BHU 24'
          }
          this.getHfList(res.Data.DistrictCode, this.hfTypes[0].Code, this.BasicHealthUnit[0].Name);



          this.empRoaster.month = this.month;
          this.empRoaster.hfTypeCode = res.Data.HftypeCode;
          this.empRoaster.ModeName = res.Data.ModeName;
          this.empRoaster.hfmisCode = res.Data.Hfmiscode;
          this.empRoaster.rosterDate = this.RosterDate;
          this.getDesignation(res.Data.Hfmiscode, res.Data.HftypeCode);
          this.AllEmpDutyRoasterList(this.empRoaster);

          console.log(this.divisions);
        }
      })
    } else {
      this.isDisable = false;
      this.placeHolderDivision = 'Select Division'
      this.placeHolderDistrict = 'Select District'
      this.placeHolderTehsil = 'Select Tehsil'
      this.placeHolderHFType = 'Select Health Facility Type'
      this.placeHolderBHU = 'Select Basic Health Unit Type'
      this.placeHolderHf = 'Select Health Facility'
    }

  }

  public AllEmpDutyRoasterList(empRoaster: object) {
    try {

      this.isLoading = true;
      this.workerService.AllEmpDutyRoasterList(empRoaster).subscribe((res: any) => {
        this.totalRec = []
        this.totalRec = res;
        this.clonedArray = JSON.parse(JSON.stringify(res));
        this.data = this.clonedArray.sort(function (a, b) {
          var textA = a.WorkingHfmiscode.toUpperCase();
          var textB = b.WorkingHfmiscode.toUpperCase();
          return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
        })
        this.finalData = [];
        this.data = [];
        this.isLoading = false;
        const key = 'Id';
        const keyDate = 'SchedularDate';
        const Shifts = 'ShiftName'


        this.AllShiftsCurrent = [...new Map(this.totalRec.map(
          (item: { [x: string]: any; }) => [item[Shifts], item])).values()];


        this.data = [...new Map(this.totalRec.map(
          (item: { [x: string]: any; }) => [item[key], item])).values()];

        this.data = this.data.sort(function (a, b) {
          var textA = a.FullName.toUpperCase();
          var textB = b.FullName.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        })
        for (let i = 0; i < this.data.length - 1; i++) {
          if (this.data[i]?.WorkingHfmiscode !== this.data[i + 1]?.WorkingHfmiscode) {
            this.counter++;
            if (this.counter >= 1) {
              this.data.splice(i + 1, 0, { hf: 'Health Facility' });
              ++i;
            }
          }
        }

        if (this.data?.length > 0) {
          this.isShow = false;
          this.dateList = [...new Map(this.totalRec.map(
            (item: { [x: string]: any; }) => [item[keyDate], item])).values()];

          for (let index2 = 0; index2 < this.dateList.length; index2++) {
            //  
            const element = this.dateList[index2];
            var temp: any[] = []
            for (let index = 0; index < this.totalRec.length; index++) {
              const _element = this.totalRec[index];

              if (element.SchedularDate === _element.SchedularDate) {
                temp.push(
                  {
                    SchedularDate: _element.SchedularDate,
                    EmployeeName: _element.EmployeeName,
                    ShiftEnd: _element.ShiftEnd,
                    ShiftName: _element.ShiftName,
                    ShiftStart: _element.ShiftStart,
                    FullName: _element.FullName,
                    Day: _element.Day,
                    ModeName: _element.ModeName,
                    Isduty: _element.Isduty,
                    hfmisCode: _element.WorkingHfmiscode
                  },
                )
              }

            }
            this.finalData.push(temp)
          }
          // this.totalRec =  this.totalRec.sort((a: any, b: any) => {
          //   return <any>new Date(b.SchedularDate) - <any>new Date(a.SchedularDate);
          // })


          this.finalData.forEach(element => {
            let data = element.sort(function (a, b) {
              var textA = a.FullName.toUpperCase();
              var textB = b.FullName.toUpperCase();
              return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            })
            return data;
          });
          console.log(this.finalData);

          let qwerty: any = []

          debugger

          for (let i = 0; i < this.finalData.length; ++i) {

            let _tempdata: any = [];
            let date = this.clonedArray[0].SchedularDate;
            let hfCode = this.clonedArray[0].WorkingHfmiscode;

            let index = 0;
            let ele: any;
            for (let j = 0; j < this.clonedArray.length; ++j) {

              ele = this.clonedArray[0];
              if (j == 0) {
                // _tempdata.push(ele.SchedularDate.split("T")[0])
              }
              if (i == this.finalData.length - 1) {
                if (this.clonedArray.length === qwerty[0].length - 1) {
                  this.clonedArray.forEach((ele) => {
                    if (ele.IsLeave) {
                      _tempdata.push('Leave')
                    }
                    if (ele.IsPublicHoliday) {
                      _tempdata.push('Public Holiday')
                    }
                    if (ele.IsLocalHoliday) {
                      _tempdata.push('Local Holiday')
                    }
                    if (ele.IsShiftSwapped) {
                      _tempdata.push('Swapped')
                    }
                    if (!ele.Isduty) {
                      _tempdata.push('OFF')
                    } else {
                      _tempdata.push(ele.ShiftName);
                    }
                  })
                }
                break
              }
              if (ele.SchedularDate === date && ele.WorkingHfmiscode === hfCode) {
                //console.log(ele.SchedularDate)
                ++index;
                if (ele.IsLeave) {
                  _tempdata.push('Leave')
                }
                if (ele.IsPublicHoliday) {
                  _tempdata.push('Public Holiday')
                }
                if (ele.IsLocalHoliday) {
                  _tempdata.push('Local Holiday')
                }
                if (ele.IsShiftSwapped) {
                  _tempdata.push('Swapped')
                }
                if (!ele.Isduty) {
                  _tempdata.push('OFF')
                } else {
                  _tempdata.push(ele.ShiftName);
                }

                this.clonedArray.splice(0, 1);

              }
              if (this.clonedArray.length == 1) {
                _tempdata.push(this.clonedArray[0].ShiftName);
              }

            }
            if (i % 2 != 0) {
              _tempdata = _tempdata.slice();
              _tempdata.splice(1, 0, ..._tempdata.splice(1, index).reverse());
            }
            qwerty.push(_tempdata);
            const chunkSize = 10;

            var arr: any = new Array([]);
            let _index = 0;
            if (i == 0) {
              for (let index = 0; index < _tempdata.length; index += chunkSize) {
                _tempdata.slice(index, index + chunkSize);
                _index += 1;
              }
              let Array2D = (r, c) => [...Array(r)].map(_ => Array(c).fill(0));

              this.matrix = Array2D(_index, 31);
            }

            let j = 0;
            for (let index = 0; index < _tempdata.length; index += chunkSize, j++) {
              const chunk = _tempdata.slice(index, index + chunkSize);
              chunk.splice(0, 0, ele.SchedularDate.split("T")[0])
              if (i == 0) {
                this.matrix[j] = [];
              }
              this.matrix[j].push(chunk)
            }
          }
          console.log('122222222222222222222', this.data);
          this.tempShifts.push(qwerty)
          console.log('', this.matrix)
          //  
          // this.finalData.forEach(element => {
          //   element.forEach(ele=>{
          //      
          //     if(ele.EmployeeName.trim() =='Zubida Perven'){
          //       console.log('***************************',ele.EmployeeName);
          //     }
          //   })
          // });

        }
        else {
          this.finalData = [];
          this.data = [];
          this.isShow = true;
          this.isLoading = false;
        }

      }),
        err => { this.handleError(err); }
    } catch (error: any) {
      console.log(error.message);
      this.isShow = true;
    }
  }
  exportPdf() {


    debugger
    this._data = [];
    console.log(this._data);
    this.data.forEach(element => {
      if (!element.hasOwnProperty('hf'))
        this._data.push(element.EmployeeName + '\n' + '(' + element.Designation + ')');
      if (element?.hf) {
        this._dataPdf.push(this._data);
        this._data = [];
      }
    });
    this._dataPdf.push(this._data);

    const doc = new jsPDF('l', 'mm', 'a4');
    this.exportColumns = [this.data[0].FullName]
    // this._dataPdf[0].splice(0, 0, 'DAYS');
    var options = {
      headStyles: {
        valign: 'middle',
        halign: 'center'
      }
    };
    let Array2D = (r, c) => [...Array(r)].map(_ => Array(c).fill(0));

    let coloumns = Array2D(this.matrix.length, 31);
    const chunkSize = 10;
    let j = 0;
    for (let i = 0; i < this._dataPdf[0].length; i += chunkSize, j++) {
      let chunk = this._dataPdf[0].slice(i, i + chunkSize);
      chunk.splice(0, 0, 'DAYS')
      coloumns[j] = []
      coloumns[j].push(chunk)
    }



    // doc['autoTable'](coloumns[0], this.tempShifts[0]);
    coloumns.forEach((ele, index) => {
      doc['autoTable'](this.exportColumns, "", options);
      doc['autoTable'](coloumns[index][0], this.matrix[index]);

    })


    // doc.save("Roster Data.pdf");
    // const chunkSize = 10;
    // let chunk = [];
    // let array = this.tempShifts[0];
    // array.forEach(element => {
    //   for (let i = 0; i < element.length; i += chunkSize) {
    //     chunk = element.slice(i, i + chunkSize);
    //     console.log(chunk);
    //   }
    // });


    // doc['autoTable'](this.exportColumns, "", options);
    // doc['autoTable'](this._dataPdf[0], this.tempShifts[0]);
    // doc['autoTable'](this.exportColumns, "",options);
    // doc['autoTable'](data, myObj);
    // doc.autoTable(this.exportColumns, this.products);
    doc.save("Roster Data.pdf");
  }




  saveHf(HfName: any) {

    this.found = true;
    if (this.pdfObjectHeader.length > 0) {
      var found = this.pdfObjectHeader.some(el => el.HealthFacility === HfName);
    }
    if (!found) {
      this.pdfObjectHeader.push({ HealthFacility: HfName, colSpan: 3, styles: { halign: 'center', fillColor: [22, 160, 133] } });
    }
    return HfName;
  }



  exportTableToExcel(tableID, filename = '') {
    // const tableSelect:
    //   XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById('tblData'));

    // tableSelect['!cols'] = [];
    // tableSelect['!cols'][0] = { hidden: true };
    // tableSelect['Sheets'].Sheet1.A1.s = { font: { bold: true } };
    // /* here 12 is your column number (n-1) */
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();

    // XLSX.utils.book_append_sheet(wb, tableSelect, 'Servers');
    // // /* save to file */
    // XLSX.writeFile(wb, 'myproject.xls');
    //  
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect: any = document.getElementById(tableID);

    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    // var tableHTML = tableSelect.outerHTML.replace('Week1', '');

    // Specify file name
    filename = filename ? filename + '.xls' : 'excel_data.xls';

    // Create download link element
    downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);
    const nav = (window.navigator as any);
    if (nav.msSaveOrOpenBlob) {
      // var blob = new Blob(['\ufeff', tableSelect], {
      //   type: dataType
      // });
      // nav.msSaveOrOpenBlob(blob, filename);
    } else {
      // Create a link to the file
      downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

      // Setting the file name
      downloadLink.download = filename;

      //triggering the function
      downloadLink.click();
    }
  }

















  private handleError(err: any) {
    if (err.status == 403) {
      console.log(err.message);
      this.isServerResponding = true;
      this.isLoading = false;
    }
    this.isServerResponding = true;
    this.isLoading = false;

  }
  private getDesignation = (hfCode: string, hfTypeCode: string) => {

    this.rootService.getDesignation(hfCode, hfTypeCode).subscribe((res: any) => {
      this.designation = res;
      console.log(this.designation);
    },
      err => { this.handleError(err); }
    );
  }


  public disableFilter() {
    let code = this.user.HfmisCode.slice(0, 3)
    this.placeHolderDivision = ''
    this.divisions = this.divisions.filter(x => x.Code === code);
    if (this.user.HfmisCode.length > 3) {
      code = this.user.HfmisCode.slice(0, 6)
      this.placeHolderDistrict = ''
      this.loadDistrict(code)
      if (this.user.HfmisCode.length > 9) {
        code = this.user.HfmisCode.slice(0, 9)
        this.placeHolderTehsil = ''
        this.placeHolderHFType = ''
        this.placeHolderHf = ''
        this.loadTehsils(code)
        this.getHfList(this.user.HfmisCode, this.user.HfTypeCode, '');
        this.empRoaster.hfmisCode = this.user.HfmisCode
        this.empRoaster.hfTypeCode = this.user.HfTypeCode
        this.getDesignation(this.user.HfmisCode, this.user.HfTypeCode);
        this.AllEmpDutyRoasterList(this.empRoaster);
      } else {
        this.loadTehsils(code)
      }
    } else {
      this.loadDistrict(code)
    }
  }

  private getDivisions = () => {

    this.rootService.getDivisions().subscribe((res: any) => {
      this.divisions = res;
      console.log("Printing all divisions :: ", this.divisions);
      if (this.user.DivisionCode == null && this.user.DistrictCode == null && this.user.TehsilCode == null && (this.user.HfmisCode == null || this.user.HfmisCode == "0")) {
        return;
      }
      if (this.user.HfTypeCode == '014') {
        this.placeHolderBHU = ''
        this.isShowHfType = true
        this.BasicHealthUnit = this.BasicHealthUnit.filter(x => x.Name == this.user.hfMode)
      }
      if (this.user.HfTypeCode != '') {
        this.hfTypes = this.hfTypes.filter(x => x.Code == this.user.HfTypeCode)
      }
      this.disableFilter();
      err => { this.handleError(err); }
    });
  }


  // private getDivisions = () => {
  //    
  //   this.rootService.getDivisions().subscribe((res: any) => {
  //     this.divisions = res;
  //     console.log("Printing all divisions :: ", this.divisions);
  //     if (this.user.DivisionCode == null && this.user.DistrictCode == null && this.user.TehsilCode == null
  //       && (this.user.HfmisCode == null || this.user.HfmisCode == "0")) {
  //       return;
  //     } else {
  //       if (this.user.DivisionCode != null) {
  //         this.placeHolderDivision = ''
  //         this.divisions = this.divisions.filter(x => x.Code === this.user.DivisionCode);
  //         if (this.user.DistrictCode != null) {
  //           this.placeHolderDistrict = ''
  //           this.loadDistrict(this.user.DistrictCode)
  //           if (this.user.TehsilCode != null) {
  //             this.placeHolderTehsil = ''
  //             this.placeHolderHFType = ''
  //             this.loadTehsils(this.user.TehsilCode);
  //             this.hfTypes.forEach((ele) => {
  //               if (this.user.hfname.includes(ele.Name)) {
  //                 this.hfTypes = []
  //                 this.hfTypes[0] = ele;
  //                 this.placeHolderHf = ''
  //                 if (this.user.hfname.includes('District Headquarter Hospital')) {
  //                   // this.healthFacilities.filter(x=>x.Code === this.user.HfmisCode)
  //                   this.getHfList(this.user.HfmisCode, '011', '');
  //                   this.empRoaster.hfmisCode = this.user.HfmisCode
  //                   this.empRoaster.hfTypeCode = '011'
  //                   this.AllEmpDutyRoasterList(this.empRoaster);
  //                 } else if (this.user.hfname.includes('Tehsil Headquarter Hospital')) {
  //                   // this.healthFacilities.filter(x=>x.Code === this.user.HfmisCode)
  //                   this.empRoaster.hfmisCode = this.user.HfmisCode
  //                   this.empRoaster.hfTypeCode = '012'
  //                   this.getHfList(this.user.HfmisCode, '012', '');
  //                   this.AllEmpDutyRoasterList(this.empRoaster);
  //                 } else if (this.user.hfname.includes('Rural Health Center')) {
  //                   this.getHfList(this.user.HfmisCode, '013', '');
  //                   this.empRoaster.hfmisCode = this.user.HfmisCode
  //                   this.empRoaster.hfTypeCode = '013'
  //                   this.AllEmpDutyRoasterList(this.empRoaster);
  //                 } else if (this.user.hfname.includes('Basic Health Unit')) {
  //                   this.isShowHfType = false;
  //                   this.getHfList(this.user.HfmisCode, '014', '');
  //                   this.empRoaster.hfmisCode = this.user.HfmisCode
  //                   this.empRoaster.hfTypeCode = '014'
  //                   this.AllEmpDutyRoasterList(this.empRoaster);
  //                 }
  //                 return;
  //               } else if (this.user?.hfname.includes('Level Hospital')) {
  //                 this.hfTypes = []
  //                 this.hfTypes[0] = ele;
  //                 this.placeHolderHf = ''
  //                 this.getHfList(this.user.HfmisCode, '068', '');
  //                 this.empRoaster.hfmisCode = this.user.HfmisCode
  //                 this.empRoaster.hfTypeCode = '068'
  //                 this.AllEmpDutyRoasterList(this.empRoaster);
  //                 return;
  //               }
  //             })
  //           } else {
  //             this.loadTehsils(this.user.DistrictCode);
  //           }
  //         } else {
  //           this.loadDistrict(this.user.DivisionCode)
  //         }
  //       } else {
  //          
  //         if (this.user.HfmisCode != null) {
  //           let code = this.user.HfmisCode.slice(0, 3)
  //           this.placeHolderDivision = ''
  //           this.divisions = this.divisions.filter(x => x.Code === code);
  //           code = this.user.HfmisCode.slice(0, 6)
  //           this.placeHolderDistrict = ''
  //           this.loadDistrict(code)
  //           if (this.user.HfmisCode.length > 9) {
  //             code = this.user.HfmisCode.slice(0, 9)
  //             this.placeHolderTehsil = ''
  //             this.placeHolderHFType = ''
  //             this.loadTehsils(code)
  //           } else {
  //             this.loadTehsils(code)
  //           }

  //           this.hfTypes.forEach((ele) => {
  //              
  //             if (this.user?.hfname.includes(ele.Name)) {
  //               this.hfTypes = []
  //               this.hfTypes[0] = ele;
  //               this.placeHolderHf = ''
  //               this.IsShowPdf = true;
  //               if (this.user?.hfname.includes('District Headquarter Hospital')) {
  //                 this.empRoaster.hfmisCode = this.user.HfmisCode
  //                 this.empRoaster.hfTypeCode = '011'
  //                 this.getHfList(this.user.HfmisCode, '011', '');
  //                 this.AllEmpDutyRoasterList(this.empRoaster);
  //                 // this.healthFacilities.filter(x => x.Code === this.user.HfmisCode)
  //               } else if (this.user.hfname.includes('Tehsil Headquarter Hospital')) {
  //                 this.empRoaster.hfmisCode = this.user.HfmisCode
  //                 this.empRoaster.hfTypeCode = '012'
  //                 this.getHfList(this.user.HfmisCode, '012', '');
  //                 this.AllEmpDutyRoasterList(this.empRoaster);
  //                 // this.healthFacilities.filter(x => x.Code === this.user.HfmisCode)
  //               } else if (this.user.hfname.includes('Rural Health Center')) {
  //                 this.empRoaster.hfmisCode = this.user.HfmisCode
  //                 this.empRoaster.hfTypeCode = '013'
  //                 this.getHfList(this.user.HfmisCode, '013', '');
  //                 this.AllEmpDutyRoasterList(this.empRoaster);
  //               } else if (this.user.hfname.includes('Basic Health Unit')) {
  //                 this.empRoaster.hfmisCode = this.user.HfmisCode
  //                 this.empRoaster.hfTypeCode = '014'
  //                 this.isShowHfType = false;
  //                 this.getHfList(this.user.HfmisCode, '014', '');
  //                 this.AllEmpDutyRoasterList(this.empRoaster);
  //               }
  //               return;
  //             }
  //           })
  //         }
  //       }

  //     }
  //     console.log("Printing User divisions :: ", this.divisions);
  //   },
  //     err => { this.handleError(err); }
  //   );
  // }

  private getHfTypes = () => {
    this.rootService.getHfTypes().subscribe((res: any) => {
      this.hfTypes = res.sort();
      console.log(this.hfTypes);
    },
      err => { this.handleError(err); }
    );
  }

  public loadDistrict(divCode: string) {
    this.districts = [];
    this.rootService.getDistricts(divCode)
      .subscribe((x: any) => {
        if (x) {
          this.districts = x;
        }
      });
  }

  public loadTehsils(disCode: string) {

    this.tehsils = [];
    this.rootService.getTehsils(disCode)
      .subscribe((x: any) => {
        if (x) {

          this.tehsils = x;
        }
      });
  }

  public loadHFTypes() {
    this.HFType = [];
    this.rootService.getHFTypes()
      .subscribe((x: any) => {
        if (x) {
          this.HFType = x;
          if (this.isHfName) {
            this.hfTypes
          }
        }
      });
  }
  public getHfList(disCode: string, bhuCode: string, bhuName: string) {

    this.rootService.getHfList(disCode, bhuCode, bhuName).subscribe(
      (res: any) => {
        if (res) {
          if (this.isDisable) {
            this.healthFacilities = res;
            this.healthFacilities = this.healthFacilities.filter(x => x.FullName === this.tempHF);
            console.log(this.healthFacilities);
          } else {
            this.healthFacilities = res;
          }
        }
      },
      err => {
      }
    );
  }

  public getBhuList() {

    this.rootService.getBhuList().subscribe(
      (res: any) => {
        if (res) {

          this.BasicHealthUnit = res;
          this.BasicHealthUnit = this.BasicHealthUnit.filter(x => x.Name != 'Plus' && x.Name != 'BHU Plus')
          console.log(this.BasicHealthUnit);
        }
      },
      err => {
      }
    );
  }

  public checkIndex(value: number) {

    if (value === 31) {
      this.finalData = [];
      return false;
    } else {
      return true
    }
  }


  public dropdownValueChanged = (value, filter) => {

    // if (value.Code != '014' && filter != 'hft' && filter != 'hf') {
    //   this.BasicHealthUnitType.Name = ""
    //   this.BasicHealthUnitType.Code = ""
    // }
    console.log(value);
    if (!value) {
      return;

    }

    if (filter == 'date') {
      this.empRoaster.rosterDate = this.RosterDate;
      this.AllEmpDutyRoasterList(this.empRoaster);
    }
    if (filter == 'Div') {

      this.loadDistrict(value.Code);
      this.isShowHfType = false;
      this.empRoaster.hfmisCode = value.Code;
      this.empRoaster.rosterDate = this.RosterDate;
      this.districts = []
      this.tehsils = []
      this.loadTehsils(value.Code);
      this.healthFacilities = []
      this.BasicHealthUnit = []
      this.hfTypes = []
      this.BasicHealthUnit = []
      this.getBhuList();
      this.getHfTypes();
      // this.AllEmpDutyRoasterList(this.empRoaster);

    }
    if (filter == 'Dis') {
      this.isShowHfType = false;
      this.tehsils = []
      this.loadTehsils(value.Code);
      this.healthFacilities = []
      this.BasicHealthUnit = []
      this.hfTypes = []
      this.BasicHealthUnit = []
      this.getBhuList();
      this.getHfTypes();
      this.empRoaster.hfmisCode = value.Code;
      this.empRoaster.rosterDate = this.RosterDate;
      // this.AllEmpDutyRoasterList(this.empRoaster);

    }
    if (filter == 'Teh') {
      this.healthFacilities = []
      this.BasicHealthUnit = []
      this.hfTypes = []
      this.BasicHealthUnit = []
      this.getBhuList();
      this.getHfTypes();
      this.empRoaster.hfmisCode = value.Code;
      this.empRoaster.rosterDate = this.RosterDate;
      // this.AllEmpDutyRoasterList(this.empRoaster);

    }
    if (filter === "bhu") {

      this.empRoaster.hfmisCode = ""
      this.empRoaster.hfTypeCode = ""
      this.empRoaster.ModeName = ""
      this.healthFacilities = []
      this.BasicHealthUnit = []
      this.designation = []
      if (value.Name === 'Basic Health Unit') {
        this.isShowHfType = true;
        this.getBhuList();
        this.healthFacilities = []
        this.empRoaster.hfmisCode = this.districtsData.Code;
        this.empRoaster.hfTypeCode = value.Code;
        this.empRoaster.rosterDate = this.RosterDate;
        // this.AllEmpDutyRoasterList(this.empRoaster);
        // this.getHfList(this.districtsData.Code, this.HfTypesData.Code, this.BasicHealthUnitType?.Name);
      } else {
        this.isShowHfType = false;
        this.getHfList(this.tehsilsData.Code, this.HfTypesData.Code, '');
        this.empRoaster.ModeName = "";
        this.empRoaster.designation = "";
        this.empRoaster.hfmisCode = this.districtsData.Code;
        this.empRoaster.hfTypeCode = value.Code;
        this.empRoaster.rosterDate = this.RosterDate;
        // this.AllEmpDutyRoasterList(this.empRoaster);
      }
      this.empRoaster.hfmisCode = this.districtsData.Code;
      this.empRoaster.hfTypeCode = value.Code;
      this.empRoaster.rosterDate = this.RosterDate;
      // this.AllEmpDutyRoasterList(this.empRoaster);
    }
    if (filter === 'hft') {
      if (this.BasicHealthUnitType?.Name == 'BHU 24/7') {
        this.BasicHealthUnitType.Name = 'BHU 24'
      }
      this.getHfList(this.tehsilsData.Code, this.HfTypesData.Code, this.BasicHealthUnitType?.Name);
      this.empRoaster.hfmisCode = this.districtsData.Code;
      if (this.HfTypesData.Code === '014') {

        this.empRoaster.ModeName = this.BasicHealthUnitType?.Name;
      } else {
        this.empRoaster.ModeName = ''
      }
      this.empRoaster.rosterDate = this.RosterDate;
      // this.AllEmpDutyRoasterList(this.empRoaster);
      this.getDesignation(value.Hfmiscode, this.HfTypesData.Code)
      // this.AllEmpDutyRoasterList(empRoaster);
    }



    if (filter === 'hf') {
      this.IsShowPdf = true;
      this.pdfData = [];
      this.tempShifts = [];
      this._dataPdf = [];
      // this.getHfList(this.districtsData.Code, this.HfTypesData.Code, this.BasicHealthUnitType?.Name);
      this.empRoaster.hfmisCode = value.Hfmiscode;
      this.empRoaster.designation = ''
      if (this.HfTypesData.Code === '014') {
        this.empRoaster.ModeName = this.BasicHealthUnitType?.Name;

      } else {

        // if (value.Name === 'Basic Health Unit') {

        //   this.empRoaster.ModeName = this.BasicHealthUnitType?.Name;
        // } else {
        this.empRoaster.ModeName = ''
        // }
      }
      this.empRoaster.rosterDate = this.RosterDate;
      this.AllEmpDutyRoasterList(this.empRoaster);
      this.getDesignation(value.Hfmiscode, this.HfTypesData.Code)
      // this.AllEmpDutyRoasterList(empRoaster);
    }

    if (filter === 'des') {

      this.empRoaster.designation = this.designationData.Name;
      if (this.HfTypesData.Code === '014') {

        this.empRoaster.ModeName = this.BasicHealthUnitType?.Name;
      } else {
        this.empRoaster.ModeName = ''
      }
      this.empRoaster.rosterDate = this.RosterDate;
      this.AllEmpDutyRoasterList(this.empRoaster);
      // this.AllEmpDutyRoasterList(empRoaster);
    }
  };


  GetData(Id: number, date: string, shift: number, SwapFromEmployeeId: number, SwapToEmployeeId: number) {
    // console.log(this.totalRec);

    let id = Id + date + shift;

    var rec = this.totalRec.find((car) => car.Id == Id && car.SchedularDate == date);

    // console.log('===================================', rec);
    if (rec != undefined) {

      if (rec.IsLeave == true) {
        this.element = document.getElementById(id);

        this.element.style.backgroundColor = "rgb(" + [255, 146, 146].join(',') + ")";
        return 'Leave';
      }
      if (rec.IsPublicHoliday == true) {
        this.element = document.getElementById(id);

        this.element.style.backgroundColor = "rgb(" + [255, 146, 146].join(',') + ")";
        return 'Public Holiday';
      }
      if (rec.IsLocalHoliday == true) {
        this.element = document.getElementById(id);

        this.element.style.backgroundColor = "rgb(" + [255, 146, 146].join(',') + ")";
        return 'Local Holiday';
      }
      if (rec.IsShiftSwappedFrom == true) {

        let emprec = this.totalRec.find((emp) => emp.Id == SwapToEmployeeId);

        console.log(emprec);


        this.element = document.getElementById(id);
        this.element.style.backgroundColor = "rgb(" + [191, 146, 255].join(',') + ")";
        return 'Swapped With ' + emprec.EmployeeName + ' Now Shift ' + emprec.ShiftName;
      }
      if (rec.IsShiftSwappedTo == true) {

        let emprec = this.totalRec.find((emp) => emp.Id == SwapFromEmployeeId);
        console.log(emprec);

        this.element = document.getElementById(id);
        this.element.style.backgroundColor = "rgb(" + [191, 146, 255].join(',') + ")";
        return 'Swapped With ' + emprec.EmployeeName + ' Now Shift ' + emprec.ShiftName;
      }


      if (!rec.Isduty) {
        this.element = document.getElementById(id);

        this.element.style.backgroundColor = "rgb(" + [255, 146, 146].join(',') + ")";
        return 'OFF';
      }
      return rec.ShiftName;
    } else {
      //return rec.ShiftName;
    }

  }
  ngOnDestroy() {
    localStorage.setItem("HF", '');
  }

}
