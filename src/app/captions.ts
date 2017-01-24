export function getCaption(layerName, dateText, yearText, doyText) {

  const captions = new Map([
    // climate data
    [`climate:tmin`, `Minimum Temperatures in Celsius on ${dateText} Using NCEP Data`],
    [`climate:tmax`, `Maximum Temperatures in Celsius on ${dateText} Using NCEP Data`],
    // agdd anomaly
    [`gdd:agdd_anomaly_50f`, `Accumulated Growing Degree Day Anomaly 50F Base Temp Through ${dateText} Using NCEP and PRISM Data`],
    [`gdd:agdd_anomaly`, `Accumulated Growing Degree Day Anomaly 32F Base Temp Through ${dateText} Using NCEP and PRISM Data`],
    // agdd 30 year averages
    [`gdd:30yr_avg_agdd_50f`, `30-Year Average Temperature Accumulations 50F Base Temp Through Day of Year ${doyText} Using PRISM Data`],
    [`gdd:30yr_avg_agdd`, `30-Year Average Temperature Accumulations 32F Base Temp Through Day of Year ${doyText} Using PRISM Data`],
    // agdd ncep
    [`gdd:agdd`, `Accumulated Growing Degree Days 32F Base Temp Through ${dateText} Using NCEP Data`],
    [`gdd:agdd_50f`, `Accumulated Growing Degree Days 50F Base Temp Through ${dateText} Using NCEP Data`],
    // agdd prism
    [`gdd:agdd_prism`, `PRISM Accumulated Growing Degree Days 32F Base Temp Through ${dateText} Using PRISM Data`],
    // spring index historic ncep
    [`si-x:six_arnoldred_leaf_ncep_historic`, `Arnold Red Honeysuckle First Leaf ${yearText} Using NCEP Data`],
    [`si-x:six_zabelli_leaf_ncep_historic`, `Zabelii First Leaf ${yearText} Using NCEP Data`],
    [`si-x:six_lilac_leaf_ncep_historic`, `Lilac First Leaf ${yearText} Using NCEP Data`],
    [`si-x:six_arnoldred_bloom_ncep_historic`, `Arnold Red Honeysuckle First Bloom ${yearText} Using NCEP Data`],
    [`si-x:six_zabelli_bloom_ncep_historic`, `Zabelii First Bloom ${yearText} Using NCEP Data`],
    [`si-x:six_lilac_bloom_ncep_historic`, `Lilac First Bloom ${yearText} Using NCEP Data`],
    [`si-x:six_average_leaf_ncep_historic`, `Spring Index First Leaf ${yearText} Using NCEP Data`],
    [`si-x:six_average_bloom_ncep_historic`, `Spring Index First Bloom ${yearText} Using NCEP Data`],
    // spring index current year
    [`si-x:arnoldred_leaf_ncep`, `Arnold Red Honeysuckle First Leaf Through ${dateText} Using NCEP Data`],
    [`si-x:zabelli_leaf_ncep`, `Zabelii First Leaf Through ${dateText} Using NCEP Data`],
    [`si-x:lilac_leaf_ncep`, `Lilac First Leaf Through ${dateText} Using NCEP Data`],
    [`si-x:arnoldred_bloom_ncep`, `Arnold Red Honeysuckle First Bloom Through ${dateText} Using NCEP Data`],
    [`si-x:zabelli_bloom_ncep`, `Zabelii First Bloom Through ${dateText} Using NCEP Data`],
    [`si-x:lilac_bloom_ncep`, `Lilac First Bloom Through ${dateText} Using NCEP Data`],
    [`si-x:average_leaf_ncep`, `Spring Index First Leaf Through ${dateText} Using NCEP Data`],
    [`si-x:average_bloom_ncep`, `Spring Index First Bloom Through ${dateText} Using NCEP Data`],
    // spring index historic prism
    [`si-x:arnoldred_leaf_prism`, `Arnold Red Honeysuckle First Leaf ${yearText} Using PRISM Data`],
    [`si-x:zabelli_leaf_prism`, `Zabelii First Leaf ${yearText} Using PRISM Data`],
    [`si-x:lilac_leaf_prism`, `Lilac First Leaf ${yearText} Using PRISM Data`],
    [`si-x:arnoldred_bloom_prism`, `Arnold Red Honeysuckle First Bloom ${yearText} Using PRISM Data`],
    [`si-x:zabelli_bloom_prism`, `Zabelii First Bloom ${yearText} Using PRISM Data`],
    [`si-x:lilac_bloom_prism`, `Lilac First Bloom ${yearText} Using PRISM Data`],
    [`si-x:average_leaf_prism`, `Spring Index First Leaf ${yearText} Using PRISM Data`],
    [`si-x:average_bloom_prism`, `Spring Index First Bloom ${yearText} Using PRISM Data`],
    // spring index 30 year average
    [`si-x:30yr_avg_six_leaf`, `30-Year Average Spring Index First Leaf Through Day of Year ${doyText} Using PRISM Data`],
    [`si-x:30yr_avg_six_bloom`, `30-Year Average Spring Index First Bloom Through Day of Year ${doyText} Using PRISM Data`],
    // spring index anomaly
    [`si-x:leaf_anomaly`, `Spring Index First Leaf Anomaly Through ${dateText} Using NCEP and PRISM Data`],
    [`si-x:bloom_anomaly`, `Spring Index First Bloom Anomaly Through ${dateText} Using NCEP and PRISM Data`],
    // spring index BEST long term historic
    [`si-x:average_leaf_best`, `Spring Index First Leaf ${yearText} Using BEST Data`],
    [`si-x:average_bloom_best`, `Spring Index First Bloom ${yearText} Using BEST Data`]
  ]);
  return captions.get(layerName);
}
