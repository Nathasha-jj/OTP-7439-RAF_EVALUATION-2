/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
/*
 * Jobin and Jismi IT Services LLP
 *
 * ${OTP-7439} : ${RAF Evaluation}
 *
 *
 * Author: Jobin & Jismi IT Services LLP
 *
 * Date Created : 30-August-2024
 *
 * Description :This script is used to close the sales orders created
 * on or before thirty days and are in pending fulfillment status,
 * and to generate and send CSV file for recording the details of these sales orders.
 *
 * REVISION HISTORY
 *
 * @version 1.0 OTP-7439 : 30-August-2024
 */
define(['N/http', 'N/ui/serverWidget', 'N/url','N/file'],
    /**
 * @param{http} http
 * @param{serverWidget} serverWidget
 * @param{url} url
 * @param{file} file
 */
    (http, serverWidget, url, file) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => 
        {
            try
            {
                if (scriptContext.request.method === 'GET') 
                {
                    let form = serverWidget.createForm({title: 'Weather Details'});
                    let loc = form.addField(
                    { 
                        id: 'custpage_location',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Location'
                    });
                    let date = form.addField(
                    { 
                        id: 'custpage_date',
                        type: serverWidget.FieldType.DATE,
                        label: 'Date'
                    });
                   
                    form.addSubmitButton(
                    {
                        label: 'Get Weather Data',
                        id: 'custpage_getweatherdata',
                        functionName: 'submitForm'
                    });
                    scriptContext.response.writePage(form);
                }
                else
                {
                    let locationVAlue = scriptContext.request.parameters.custpage_location;
                    log.debug("Location Value", locationVAlue);
                    let dateVAlue = scriptContext.request.parameters.custpage_date;
                    log.debug("Date Value", dateVAlue);
                    let form = serverWidget.createForm({title: 'Weather Details'});
                    let weatherDataSublist = form.addSublist(
                    {
                        id: 'custpage_weather_data_sublist',
                        type: serverWidget.SublistType.LIST,
                        label: 'Weather Details'
                    });
                    weatherDataSublist.addField(
                    {
                        id: 'custpage_datetime',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Date and Time'
                    });
                    weatherDataSublist.addField(
                    {
                        id: 'custpage_temp',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Temperature'
                    });
                    weatherDataSublist.addField(
                    {
                        id: 'custpage_feelslike',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Feels Like'
                    });
                    weatherDataSublist.addField(
                    {
                        id: 'custpage_humidity',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Humidity'
                    });
                    weatherDataSublist.addField(
                    {
                        id: 'custpage_dew',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Dew'
                    });
                    weatherDataSublist.addField(
                    {
                        id: 'custpage_precip',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Precipitation'
                    });
                    weatherDataSublist.addField(
                    {
                        id: 'custpage_precipprob',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Precipitation Probability'
                    });
                    weatherDataSublist.addField(
                    {
                        id: 'custpage_snow',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Snow'
                    });
                    weatherDataSublist.addField(
                    {
                        id: 'custpage_snowdepth',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Snow Depth'
                    });
                    weatherDataSublist.addField(
                    {
                        id: 'custpage_preciptype',
                        type: serverWidget.FieldType.TEXT,
                        label: 'precipitation Type'
                    });
                    weatherDataSublist.addField(
                    {
                        id: 'custpage_windgust',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Wind Gust'
                    });

                    let weatherdata = 
                    {
                        "datetime": "2024-08-30",
                        "datetimeEpoch": 1724972400,
                        "tempmax": 22.9,
                        "tempmin": 12.5,
                        "temp": 17.5,
                        "feelslikemax": 22.9,
                        "feelslikemin": 12.5,
                        "feelslike": 17.5,
                        "dew": 9.7,
                        "humidity": 61.8,
                        "precip": 0,
                        "precipprob": 0,
                        "precipcover": 0,
                        "preciptype": null,
                        "snow": 0,
                        "snowdepth": 0,
                        "windgust": 29.9
                    }
                    let csvdata = 'Temperature,Date and Time,Humidity\n'
                    csvdata+= weatherdata.temp + ',' + weatherdata.datetime + ','+weatherdata.humidity+'\n'
                    if(locationVAlue && dateVAlue)
                    {
                        // let url ='https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+locationVAlue+'?unitGroup=metric&key=YOUR_API_KEY&contentType=json';
                        // let apiResponse = http.get(
                        // {
                        //     url: url,
                        //     headers: 
                        //     {
                        //         'Content-Type': 'application/json',
                        //         'Accept': 'application/json'
                        //     }
                        // });
                        // let weatherData = JSON.parse(apiResponse.body);
                        log.debug("Weather Data", weatherdata);
                        log.debug("Datetime", weatherdata.datetime);
                        log.debug("Weather data length", Object.keys(weatherdata).length);
                        let i = 0;
                        weatherDataSublist.setSublistValue(
                        {
                            id: 'custpage_datetime',
                            line: i,
                            value: weatherdata.datetime
                        });
                        weatherDataSublist.setSublistValue(
                        {
                            id: 'custpage_temp',
                            line: i,
                            value: weatherdata.temp
                        });
                        weatherDataSublist.setSublistValue(
                        {
                            id: 'custpage_feelslike',
                            line: i,
                            value: weatherdata.feelslike
                        });
                        weatherDataSublist.setSublistValue(
                        {
                            id: 'custpage_humidity',
                            line: i,
                            value: weatherdata.humidity
                        });
                        weatherDataSublist.setSublistValue(
                        {
                            id: 'custpage_dew',
                            line: i,
                            value: weatherdata.dew
                        });
                        weatherDataSublist.setSublistValue(
                        {
                            id: 'custpage_precip',
                            line: i,
                            value: weatherdata.precip
                        });
                        weatherDataSublist.setSublistValue(
                        {
                            id: 'custpage_precipprob',
                            line: i,
                            value: weatherdata.precipprob
                        });
                        weatherDataSublist.setSublistValue(
                        {
                            id: 'custpage_snow',
                            line: i,
                            value: weatherdata.snow
                        });
                        weatherDataSublist.setSublistValue(
                        {
                            id: 'custpage_snowdepth',
                            line: i,
                            value: weatherdata.snowdepth
                        });
                        weatherDataSublist.setSublistValue(
                        {
                            id: 'custpage_preciptype',
                            line: i,
                            value: weatherdata.preciptype
                        });
                        weatherDataSublist.setSublistValue(
                        {
                            id: 'custpage_windgust',
                            line: i,
                            value: weatherdata.windgust
                        });
                    }
                    form.addSubmitButton(
                    {
                        label: 'Get CSV',
                        id: 'custpage_csv',
                        functionName: 'submitForm'
                    });
                    scriptContext.response.writePage(form);
                    let csvFile = file.create(
                    {
                        name: "Todays Weather Data",
                        fileType: file.Type.CSV,
                        contents: csvdata,
                        folder: 28,
                        encoding: file.Encoding.UTF_8,
                        isOnline: true
                    });
                    let csvFileId = csvFile.save();
                    log.debug("CSV File Id", csvFileId);
                    scriptContext.response.writeFile(
                    {
                        file: csvFile,
                        isInline: true
                    });
                }
            }
            catch(e)
            {
                log.error("Error", e.message);
            }
        }

        return {onRequest}

    });
