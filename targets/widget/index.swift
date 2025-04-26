import WidgetKit
import SwiftUI

@main
struct exportWidgets: WidgetBundle {
  init() {
    let appGroupIdentifier = "group.com.example.rnmmkv.widget.demo"
    guard let groupDir = FileManager.default.containerURL(
      forSecurityApplicationGroupIdentifier: appGroupIdentifier
    )?.path else {
      fatalError(
        "Couldn't find app group container directory"
      )
    }
    
    // Create MMKV init
    MMKV
      .initialize(
        rootDir: nil,
        groupDir: groupDir,
        logLevel: .info
      )
    
  }
  var body: some Widget {
    
    widget()
  }
}
