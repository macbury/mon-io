module DataImport
  class EurostatInflation < Service
    URL = 'https://ec.europa.eu/eurostat/databrowser-backend/api/extraction/1.0/LIVE/false/tsv/PRC_HICP_MANR__custom_234347'.freeze

    # https://github.com/brilstl/state-debt/blob/ca3699f43d0e77c691805e82ba8dce16be21e223/data.R
    # https://ec.europa.eu/eurostat/databrowser/view/PRC_HICP_MANR__custom_234347/default/line?lang=en
  end
end