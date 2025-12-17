import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useChat } from "../hooks/useChat";
import type { Message } from "../types";

export default function ChatPanel() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session") || undefined;
  const { messages, loading, sendMessage, toggleFeedback } = useChat(sessionId);

  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !sessionId) return;
    sendMessage(inputValue);
    setInputValue("");
  };

  return (
    <div className={`h-full flex flex-col `}>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-4 bg-linear-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-2">
              How can I help you today?
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              Start a conversation by asking any question about marketing,
              strategy, or analytics.
            </p>
          </div>
        ) : (
          messages.map((message: Message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-3xl ${
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700"
                } rounded-2xl p-6 rounded-br-lg ${
                  message.role === "user" ? "rounded-bl-lg" : "rounded-bl-xl"
                }`}
              >
                <p className="mb-4 text-lg leading-relaxed">
                  {message.content}
                </p>

                {message.data?.table && (
                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                      <thead>
                        <tr className="bg-gray-50 dark:bg-gray-700">
                          {message.data.table.headers.map((header, i) => (
                            <th
                              key={i}
                              className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {message.data.table.rows.map((row, rowIndex) => (
                          <tr
                            key={rowIndex}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            {row.map((cell, cellIndex) => (
                              <td
                                key={cellIndex}
                                className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300 border-b border-gray-100 dark:border-gray-700"
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {message.data?.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 italic mb-4 bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                    {message.data.description}
                  </p>
                )}

                {message.role === "assistant" && (
                  <div className="flex space-x-2 pt-4 border-t border-gray-200 dark:border-gray-600">
                    <button
                      onClick={() => toggleFeedback(index, "like")}
                      className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-all ${
                        message.liked
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200"
                          : "text-gray-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                      }`}
                    >
                      <svg
                        className={`w-4 h-4 ${
                          message.liked ? "fill-current" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7.243-9.8a2.983 2.983 0 00-5.228 0m0 0L9.245 7.2 10.5 5.999c1.514-.809 2.804-1.199 4-1.199 1.365 0 2.609.515 3.582 1.357A5.845 5.845 0 0018.5 9.5V13"
                        />
                      </svg>
                      <span>Helpful</span>
                    </button>
                    <button
                      onClick={() => toggleFeedback(index, "dislike")}
                      className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-all ${
                        message.disliked
                          ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200"
                          : "text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      }`}
                    >
                      <svg
                        className={`w-4 h-4 ${
                          message.disliked ? "fill-current" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018A2 2 0 0115.123 4.486l-3.5 7A2 2 0 0111 14h-1zM15 14h3.764a2 2 0 001.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L10 20"
                        />
                      </svg>
                      <span>Not helpful</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-2xl p-6 rounded-bl-xl">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full animate-spin border-2 border-blue-600 border-t-transparent"></div>
                <span className="text-gray-500 dark:text-gray-400">
                  AI is thinking...
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
      >
        <div className="max-w-4xl mx-auto flex items-end space-x-3">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything about marketing, strategy, or analytics..."
            className="flex-1 resize-none h-16 p-4 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            disabled={loading}
            rows={2}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || loading}
            className="w-12 h-12 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-2xl flex items-center justify-center transition-colors shadow-sm"
          >
            {loading ? (
              <svg
                className="w-6 h-6 text-white animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
