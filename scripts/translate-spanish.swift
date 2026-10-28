import Foundation
import Translation

let data = FileHandle.standardInput.readDataToEndOfFile()
let strings = try JSONDecoder().decode([String].self, from: data)
let source = Locale.Language(identifier: "en")
let target = Locale.Language(identifier: "es")
let session: TranslationSession
if #available(macOS 26.4, *) {
    session = TranslationSession(installedSource: source, target: target, preferredStrategy: .highFidelity)
} else {
    session = TranslationSession(installedSource: source, target: target)
}

var output = Array(repeating: "", count: strings.count)
for start in stride(from: 0, to: strings.count, by: 32) {
    let end = min(start + 32, strings.count)
    let requests = (start..<end).map { index in
        TranslationSession.Request(sourceText: strings[index], clientIdentifier: String(index))
    }
    do {
        let responses = try await session.translations(from: requests)
        for response in responses {
            guard let id = response.clientIdentifier, let index = Int(id) else { continue }
            output[index] = response.targetText
        }
    } catch {
        fputs("Translation failed at items \(start)-\(end): \(error)\n", stderr)
        throw error
    }
    fputs("Translated \(end) of \(strings.count) segments\n", stderr)
}

let result = try JSONEncoder().encode(output)
FileHandle.standardOutput.write(result)
