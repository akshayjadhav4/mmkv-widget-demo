const withMMKVBridgingHeader = (config) => {
  config.props.buildSettings.SWIFT_OBJC_BRIDGING_HEADER =
    "../targets/widget-Bridging-Header.h";
};
module.exports = withMMKVBridgingHeader;
